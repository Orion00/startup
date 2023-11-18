"use strict"
let delete_mode = false;
const max_notes = 4;
let curr_notes = 0;
let notes;
let username;

//TODO: Add addNoteAndIncrement (like campaigns or chaos bag)
//TODO: Connect updateBackendNotes (to everything)

document.addEventListener('DOMContentLoaded', fetchDataAndUpdateNotes);

async function fetchDataAndUpdateNotes() {
    await fetchData();
    updateNotes();
}

async function fetchData() {
    // Check if there's information on the server
    if (checkIfLoggedIn()) {
        username = sessionStorage.getItem('username');
        console.log(username, "(Username)");
        await getNotes(username);
        notes = JSON.parse(localStorage.getItem('notepads'));
        console.log(notes);
    } else {
        // If not logged in or no server information, check local storage
        notes = JSON.parse(localStorage.getItem('notepads'))

        if (!notes) {
            // If both server and local storage are empty, use the default user
            await getNotes('test');
            console.log('Using default user');
        }
        notes = JSON.parse(localStorage.getItem('notepads'));
        console.log(notes);
    }
}



// ADDING NOTEBOOK Functions
function addNote(notepadName,notepadText,first_time) {
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

        if (notepadName === undefined) {
            notepadName = `Notepad ${curr_notes}`
            if (notes.hasOwnProperty(notepadName)) {
                notepadName += ' (1)'
            }
        }
        
        let nLabel = create('label',[],notepadName);
        nLabel.for = `notes${curr_notes}`;
        nLabel.addEventListener('dblclick', makeEditable);
        nFormGroup.appendChild(nLabel);

        if (notepadText === undefined) {
            notepadText= ""
        }
        let nTextArea = create('textarea',['form-control']);
        nTextArea.id = `notes${curr_notes}`;
        nTextArea.rows = 3;
        nTextArea.value = notepadText;
        nFormGroup.appendChild(nTextArea);

        //After creating the notepad, add to local storage
        //TODO: Add to DB too
        notes[notepadName] = notepadText;
        localStorage.setItem('notepads', JSON.stringify(notes));
        
        if (!first_time) {updateBackendNotes(notes);}

        console.log(notepadName,notepadText)

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
            const label = target.querySelector("label").textContent
            if (notes.hasOwnProperty(label)) {
                delete notes[label]
                localStorage.setItem('notepads', JSON.stringify(notes));
                updateBackendNotes(notes);
            }
            
        } else {
            const parentColDiv = target.closest('.col-lg.text-center');
            const label = parentColDiv.querySelector("label").textContent
            if (notes.hasOwnProperty(label)) {
                delete notes[label]
                localStorage.setItem('notepads', JSON.stringify(notes));
                updateBackendNotes(notes);
            }
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

// Populates notepads based on local storage
function updateNotes() {
    for (let n in notes) {
        addNote(n, notes[n],true)
    }
}

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
            console.log("Orig",originalText)
            console.log("New label",input.value)
            if (originalText in notes) {
                const value = notes[originalText];
                notes[input.value] = value;
                delete notes[originalText];
                localStorage.setItem('notepads', JSON.stringify(notes));
                updateBackendNotes(notes);
            }
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
    labelElements.forEach(lab => lab.addEventListener('dblclick', makeEditable));
})

// SAVE FUNCTIONS
function saveContent(event) {
    const formGroup = event.target.previousElementSibling;
    const formGroupLabel = formGroup.querySelector('label')
    const formGroupText = formGroup.querySelector('[id^="notes"]');

    if (formGroupText) {
        console.log('Textarea label:',formGroupLabel.textContent)
        console.log('Textarea content:', formGroupText.value);
        notes[formGroupLabel.textContent] = formGroupText.value;
        localStorage.setItem('notepads', JSON.stringify(notes));
        updateBackendNotes(notes);
        
    } else {
        // If the sibling element doesn't exist, handle accordingly
        console.log("Error: Save Button doesn't work");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const saveButtons = document.querySelectorAll('.save');
    saveButtons.forEach(button => button.addEventListener('click',saveContent));
})

// CLEAR FUNCTIONS
function clearContent(event) {
    const formGroup = event.target.previousElementSibling.previousElementSibling;
    const formGroupLabel = formGroup.querySelector('label')
    const formGroupText = formGroup.querySelector('[id^="notes"]');


    if (formGroupText) {
        // If the sibling element exists, perform the necessary actions
        // For example, you can modify or manipulate the sibling element
        console.log('Textarea previous content:', formGroupText.value);
        formGroupText.value ='';
        notes[formGroupLabel.textContent] = formGroupText.value;
        localStorage.setItem('notepads', JSON.stringify(notes));
        updateBackendNotes(notes);
    } else {
        // If the sibling element doesn't exist, handle accordingly
        console.log("Error: Clear Button doesn't work");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const clearButtons = document.querySelectorAll('.clear');
    clearButtons.forEach(button => button.addEventListener('click',clearContent));
})

// Helper Functions
function checkIfLoggedIn() {
    return (sessionStorage.getItem('username'))
}

// GET and Post
function getNotes(username) {
    const url = `/user?username=${encodeURIComponent(username)}`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`User not found for username: ${username}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data", data[0]);
        if (data && Object.keys(data[0]).length > 0) {
            let user = data[0];
          localStorage.setItem('notepads', JSON.stringify(user['notepads']));
          console.log("Our data is", user['notepads'])
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

  function updateBackendNotes(notes) {
    if (checkIfLoggedIn()) {
        username = sessionStorage.getItem('username');
        const url = `/updateNotepads?username=${encodeURIComponent(username)}`;
        console.log(url)
        // Make the POST request
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, notes: notes}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to update notes on the server: ${response.status}`);
            }
            console.log('Notes updated on the server');
        })
        .catch(error => {
            console.error('Error updating notes on the server:', error);
            // Handle the error as needed
        });
    }
}