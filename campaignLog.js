"use strict"

// CHANGING SELECTION FUNCTIONS
const campaignSelector = document.getElementById('campaignSelector');
const campaignNotes = document.getElementById('campaignnotes');

// Initialize or retrieve data from local storage
let campaignData = JSON.parse(localStorage.getItem('campaignData')) || {
    daisy: "Initial text for Daisy Walker's campaign.",
    mark: "Initial text for Mark Harrigan's campaign."
};

// Function to update the text area based on the dropdown selection
function updateTextArea() {
    const selectedCampaign = campaignSelector.value;
    campaignNotes.value = campaignData[selectedCampaign];
}

// Event listener for when the dropdown selection changes
campaignSelector.addEventListener('change', updateTextArea);

// SAVE BUTTON FUNCTION
document.querySelector('.save').addEventListener('click', function () {
    const selectedCampaign = campaignSelector.value;
    campaignData[selectedCampaign] = campaignNotes.value;
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
});

// CLEAR BUTTON FUNCTION
document.querySelector('.clear').addEventListener('click', function () {
    const selectedCampaign = campaignSelector.value;
    campaignData[selectedCampaign] = ""; // Clear the campaign's text
    campaignNotes.value = ""; // Clear the text area
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
});

// Trigger the initial update
updateTextArea();


