"use strict"

// TODO: Check database before populating campaignData with localStorage
// TODO: Add Campaign to database when using AddCampaign(), save, or clear

// CHANGING SELECTION FUNCTIONS
const campaignSelector = document.getElementById('campaignSelector');
const campaignNotes = document.getElementById('campaignnotes');
let campaignData;
let username;

// Initialize or retrieve data from local storage
document.addEventListener('DOMContentLoaded', fetchDataAndUpdatePage);

async function fetchDataAndUpdatePage() {
    await fetchData();
    displayTextArea();
}

async function fetchData() {
    // Check if there's information on the server
    if (checkIfLoggedIn()) {
        username = sessionStorage.getItem('username');
        console.log(username, "(Username)");
        await getCampaigns(username);
        campaignData = JSON.parse(localStorage.getItem('campaignData'));
        console.log(campaignData);
    } else {
        // If not logged in or no server information, check local storage
        campaignData = JSON.parse(localStorage.getItem('campaignData'));

        if (!campaignData) {
            // If both server and local storage are empty, use the default user
            await getCampaigns('test');
            console.log('Using default user');
        }
        campaignData = JSON.parse(localStorage.getItem('campaignData'));
        console.log(campaignData);
    }
}

// Function to update the text area based on the dropdown selection
function updateTextArea() {
    const selectedCampaign = campaignSelector.options[campaignSelector.selectedIndex].text.split(" - ")[0];
    campaignNotes.value = campaignData[selectedCampaign]['Notes'];
}

// Event listener for when the dropdown selection changes
campaignSelector.addEventListener('change', updateTextArea);

// SAVE BUTTON FUNCTION
document.querySelector('.save').addEventListener('click', function () {
    const selectedCampaign = campaignSelector.options[campaignSelector.selectedIndex].text.split(" - ")[0];
    campaignData[selectedCampaign]['Notes'] = campaignNotes.value;
    console.log("Saving",campaignData)

    // Update local storage always and backend if logged in
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
    updateBackendCampaigns(campaignData);

});

// CLEAR BUTTON FUNCTION
document.querySelector('.clear').addEventListener('click', function () {
    const selectedCampaign = campaignSelector.options[campaignSelector.selectedIndex].text.split(" - ")[0];
    campaignData[selectedCampaign]['Notes'] = ""; // Clear the campaign's text
    campaignNotes.value = ""; // Clear the text area

    // Update local storage always and backend if logged in
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
    updateBackendCampaigns(campaignData);
});

// ADD CAMPAIGN
function addCampaign() {
    console.log("Is this thing ever called?")
    const selectedModalCampaign = document.getElementById('campaignModal');
    const selectedModalName = document.getElementById('investigatorInput');
    const newCampaignName = selectedModalCampaign.options[selectedModalCampaign.selectedIndex].text;
    const newCampaignInvestigator = selectedModalName.value
    campaignData[newCampaignName] = {
        Investigator: newCampaignInvestigator,
        Notes: "",
    };
    addSelectOption(newCampaignName)
    console.log("New name is this thing",selectedModalName.value)
    selectedModalName.value = "";
    // Update local storage always and backend if logged in
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
    updateBackendCampaigns(campaignData);
}

function displayTextArea() {
    console.log("campaign data is this when trying to display",campaignData)
    while (campaignSelector.firstChild) {
        campaignSelector.removeChild(campaignSelector.firstChild);
      }
    for (let c in campaignData) {
        addSelectOption(c);
    updateTextArea();
    }
}

// REMOVE CAMPAIGN
function removeCampaign() {
    const selectedText = campaignSelector.options[campaignSelector.selectedIndex].text;
    const selectedCampaign = selectedText.split(" - ")[0];
    // TODO: Add check if you want to remove
    console.log("Are you sure you want to remove", selectedCampaign);

    if (selectedCampaign) {
        delete campaignData[selectedCampaign];
        localStorage.setItem('campaignData', JSON.stringify(campaignData));
        updateBackendCampaigns(campaignData);
        displayTextArea();
    } else {
        console.log("Error. Remove button didn't work.");
    }
}



// HELPER
function checkIfLoggedIn() {
    return (sessionStorage.getItem('username'))
}

function addSelectOption(campaignName) {
    let newSelectOption = document.createElement('option')
    const newSelectCampaignName = campaignName
    const newSelectInvestigatorName = campaignData[campaignName]['Investigator']
    newSelectOption.value = newSelectInvestigatorName.split(" ")[0]
    newSelectOption.textContent = newSelectCampaignName + ' - ' + newSelectInvestigatorName
    campaignSelector.append(newSelectOption)
}

// GET and POST
function getCampaigns(username) {
    const url = `/user?username=${encodeURIComponent(username)}`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`User not found for username: ${username}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data");
        if (data) {
            let user = data;
          localStorage.setItem('campaignData', JSON.stringify(user['campaigns']));
          console.log("Our data is", user['campaigns'])
        } else {
          // Handle the case where user data is empty
          console.error('User data is empty');
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching user data:", error);
        // Display a user-friendly message to the user
        alert("Username not found. Please check your username and try again.");
      });
  }

function updateBackendCampaigns(campaigns) {
    if (checkIfLoggedIn()) {
        username = sessionStorage.getItem('username');
        const url = `/updateCampaigns?username=${encodeURIComponent(username)}`;
        console.log(url)
        // Make the POST request
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, campaigns: campaigns}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to update bag on the server: ${response.status}`);
            }
            console.log('Campaigns updated on the server');
        })
        .catch(error => {
            console.error('Error updating campaigns on the server:', error);
            // Handle the error as needed
        });
    }
}