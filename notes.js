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
        nFormGroup.appendChild(nLabel);

        let nTextArea = create('textarea',['form-control']);
        nTextArea.id = `notes${curr_notes}`;
        nTextArea.rows = 3;
        nFormGroup.appendChild(nTextArea);

        let nButton1 = create('button',['btn','btn-success'],'Save');
        nButton1.type = 'submit';
        nColDiv.appendChild(nButton1);

        let nButton2 = create('button',['btn','btn-danger'],'Clear');
        nButton2.type = 'submit';
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
      event.target.remove();
      delete_mode = false;
      document.getElementById('deleteButton').style.backgroundColor = ''; // Revert button style
      curr_notes -= 1;
    }
}

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
    //Displays if in "delete mode"
    if (delete_mode) {
      document.getElementById('deleteButton').style.backgroundColor = 'pink';
    } else {
      document.getElementById('deleteButton').style.backgroundColor = '';
    }
}



