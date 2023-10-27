"use strict"
const max_notes = 4;

// Figure out how to store this in the database
// Figure out how to generate based on current notes
let curr_notes = 2;
// for (let i; i < curr_notes; i++) {
//     addNote();
//     console.log("Fighting");
// }

let delete_mode = false;

// ADDING NOTEBOOK Functions
function addNote() {
    if (curr_notes >= max_notes) {
        alert("Error: Max notepads reached");
    } else {
        curr_notes += 1;

        const parentElement = document.querySelector("#notes");
        let nColDiv = create('div',['col-lg','text-center']);
        nColDiv.addEventListener('click', deleteElement);
        parentElement.appendChild(nColDiv);

        let nFormGroup = create('div',['form-group']);
        nColDiv.appendChild(nFormGroup);

        let nLabel = create('label',[],`Notepad ${curr_notes}`);
        nLabel.for = `notes${curr_notes}`;
        nLabel.addEventListener('dblclick', makeEditable);
        nFormGroup.appendChild(nLabel);

        let nTextArea = create('textarea',['form-control']);
        nTextArea.id = `notes${curr_notes}`;
        nTextArea.rows = 3;
        nFormGroup.appendChild(nTextArea);

        let nButton1 = create('button',['btn','btn-success'],'Save');
        nButton1.type = 'submit';
        nButton1.addEventListener('click',saveContent);
        nColDiv.appendChild(nButton1);

        let nButton2 = create('button',['btn','btn-danger'],'Clear');
        nButton2.type = 'submit';
        nButton2.addEventListener('click',clearContent);
        nColDiv.appendChild(nButton2);
    }
}

function create(name, classes, text='') {
    let el = document.createElement(name);
    for (let cl in classes) {
        el.classList.add(classes[cl]); }
    el.textContent = text;
    return el;
}


// REMOVING NOTEBOOK FUNCTIONS
function deleteElement(event) {
    if (delete_mode) {
        const target = event.target;
        if (target.classList.contains('col-lg') && target.classList.contains('text-center')) {
            target.remove();
            toggleDeleteMode();
            curr_notes -= 1;
        } else {
            const parentColDiv = target.closest('.col-lg.text-center');
            if (parentColDiv) {
                parentColDiv.remove();
                toggleDeleteMode();
                curr_notes -= 1;
            }
        }
    }
}

// Sets up all delete buttons and deletable items to have the proper functions
document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', toggleDeleteMode);

    const elementsToRemove = document.getElementsByClassName('col-lg text-center');
    for (const element of elementsToRemove) {
        element.addEventListener('click', deleteElement);
    }
})

function toggleDeleteMode() {
    delete_mode = !delete_mode;
    console.log("delete mode now at",delete_mode);
    //Displays if in "delete mode"
    if (delete_mode) {
      document.getElementById('deleteButton').style.backgroundColor = 'pink';
    } else {
      document.getElementById('deleteButton').style.backgroundColor = '';
    }
}

// RENAMING NOTEBOOK FUNCTIONS
function makeEditable(event) {
    const label = event.target;
    const originalText = label.textContent.trim();

    const input = document.createElement('input');
    input.value = originalText;
    label.replaceWith(input);

    input.focus();
    input.select();

    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            label.textContent = originalText; // Revert to original text if input is empty
        } else {
            label.textContent = input.value;
        }
        input.replaceWith(label);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            input.blur(); // Trigger blur event on "Enter" key press
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const labelElements = document.querySelectorAll('.col-lg.text-center label');
    labelElements.forEach(el => console.log(el))
    labelElements.forEach(lab => lab.addEventListener('dblclick', makeEditable));
})

// SAVE FUNCTIONS (NEED TO CONNECT TO DB)
function saveContent(event) {
    const formGroup = event.target.previousElementSibling;
    const formGroupText = formGroup.querySelector('[id^="notes"]');


    if (formGroupText) {
        // If the sibling element exists, perform the necessary actions
        // For example, you can modify or manipulate the sibling element
        console.log('Textarea content:', formGroupText.value);
    } else {
        // If the sibling element doesn't exist, handle accordingly
        console.log("Error: Save Button doesn't work");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const saveButtons = document.querySelectorAll('.save');
    saveButtons.forEach(button => button.addEventListener('click',saveContent));
})

// CLEAR FUNCTIONS (NEED TO CONNECT TO DB)
function clearContent(event) {
    const formGroup = event.target.previousElementSibling.previousElementSibling;
    const formGroupText = formGroup.querySelector('[id^="notes"]');


    if (formGroupText) {
        // If the sibling element exists, perform the necessary actions
        // For example, you can modify or manipulate the sibling element
        console.log('Textarea previous content:', formGroupText.value);
        formGroupText.value ='';
    } else {
        // If the sibling element doesn't exist, handle accordingly
        console.log("Error: Clear Button doesn't work");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const clearButtons = document.querySelectorAll('.clear');
    clearButtons.forEach(button => button.addEventListener('click',clearContent));
})