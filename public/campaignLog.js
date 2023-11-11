"use strict"

// TODO: Check database before populating campaignData with localStorage
// TODO: Add Campaign to database when using AddCampaign(), save, or clear

// CHANGING SELECTION FUNCTIONS
const campaignSelector = document.getElementById('campaignSelector');
const campaignNotes = document.getElementById('campaignnotes');

// Initialize or retrieve data from local storage
function getCampaignData() {
    return fetch('/campaignData')
    .then(response => response.json())
    .then((data) => {
        console.log("Received data",data)
        console.log("Data then campaigndata",data,campaignData)
        if (data && Object.keys(data).length > 0) {
            campaignData = data;
          }
        console.log("Data then campaigndata",data,campaignData)
    });
}


let campaignData = JSON.parse(localStorage.getItem('campaignData'))
console.log("campaignData local storage",campaignData)

if (!campaignData || Object.keys(campaignData).length === 0) {
    campaignData = {
        'Night of the Zealot':{'Investigator':'Daisy Walker','Notes':""}
    };     
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
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
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
    console.log("Saving",campaignData)

    fetch('/campaignData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});

// CLEAR BUTTON FUNCTION
document.querySelector('.clear').addEventListener('click', function () {
    const selectedCampaign = campaignSelector.options[campaignSelector.selectedIndex].text.split(" - ")[0];
    campaignData[selectedCampaign]['Notes'] = ""; // Clear the campaign's text
    campaignNotes.value = ""; // Clear the text area
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
});

// ADD CAMPAIGN
function addCampaign() {
    const selectedModalCampaign = document.getElementById('campaignModal');
    const selectedModalName = document.getElementById('investigatorInput');
    const newCampaignName = selectedModalCampaign.options[selectedModalCampaign.selectedIndex].text;
    const newCampaignInvestigator = selectedModalName.value
    campaignData[newCampaignName] = {
        Investigator: newCampaignInvestigator,
        Notes: "",
    };
    // TODO: Add Campaign to DB
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
    addSelectOption(newCampaignName)
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

// Populate select box with initial data
document.addEventListener('DOMContentLoaded', function() {
    displayTextArea();
    getCampaignData().then(() => {
        console.log("Nah")
        displayTextArea()
    })
})

function addSelectOption(campaignName) {
    let newSelectOption = document.createElement('option')
    const newSelectCampaignName = campaignName
    const newSelectInvestigatorName = campaignData[campaignName]['Investigator']
    newSelectOption.value = newSelectInvestigatorName.split(" ")[0]
    newSelectOption.textContent = newSelectCampaignName + ' - ' + newSelectInvestigatorName
    campaignSelector.append(newSelectOption)
}
