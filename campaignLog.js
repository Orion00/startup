"use strict"

// TODO: Check database before populating campaignData with localStorage
// TODO: Add Campaign to database when using AddCampaign(), save, or clear

// CHANGING SELECTION FUNCTIONS
const campaignSelector = document.getElementById('campaignSelector');
const campaignNotes = document.getElementById('campaignnotes');

// Initialize or retrieve data from local storage
// let campaignData = JSON.parse(localStorage.getItem('campaignData')) ||
// {
//     'The Path to Carcosa':{'Investigator':'Daisy Walker','Campaign Notes':''},
//     'Edge of the Earth':{'Investigator':'Mark Harrigan','Campaign Notes':''}
// };
let campaignData = JSON.parse(localStorage.getItem('campaignData'))

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



// Populate select box with initial data
document.addEventListener('DOMContentLoaded', function() {
    for (let c in campaignData) {
        addSelectOption(c)
    }
    updateTextArea();
})

function addSelectOption(campaignName) {
    let newSelectOption = document.createElement('option')
    const newSelectCampaignName = campaignName
    const newSelectInvestigatorName = campaignData[campaignName]['Investigator']
    newSelectOption.value = newSelectInvestigatorName.split(" ")[0]
    newSelectOption.textContent = newSelectCampaignName + ' - ' + newSelectInvestigatorName
    campaignSelector.append(newSelectOption)
}
