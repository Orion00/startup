"use strict"

// RANDOMIZE FUNCTIONS
function randomizeList(event) {

    const formGroupText = document.getElementById('randomlist')

    if (formGroupText) {
        const result = formGroupText.value.split('\n');
        console.log("Split textarea content",result);
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        formGroupText.value = result.join('\n')
    } else {
        console.log("Error: Randomize Button doesn't work");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const saveButtons = document.querySelectorAll('.random');
    saveButtons.forEach(button => button.addEventListener('click',randomizeList));
})

// CLEAR FUNCTIONS
function clearContent(event) {

    const formGroupText = document.getElementById('randomlist')

    if (formGroupText) {
        // If the sibling element exists, perform the necessary actions
        // For example, you can modify or manipulate the sibling element
        console.log('Previous content:', formGroupText.value);
        formGroupText.value = "";
    } else {
        // If the sibling element doesn't exist, handle accordingly
        console.log("Error: Clear Button doesn't work");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const clearButtons = document.querySelectorAll('.clear');
    clearButtons.forEach(button => button.addEventListener('click',clearContent));
})