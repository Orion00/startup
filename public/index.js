"use strict"

// SAVING USERNAME AND PASSWORD
document.getElementById('login').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
  
    // Get username and password values
    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;
  
    // Check if username and password are not empty
    if (username.trim() !== '' && password.trim() !== '') {
      // Store username and password in session storage
      const encodedUsername = encodeURIComponent(username);
      sessionStorage.setItem('username', encodedUsername);
      //sessionStorage.setItem('password', password);
  
      console.log('Username (not password) saved to session storage.');
      updateIdentifier();
      getUser(username);
    } else {
      // Handle if username or password is empty
      console.log('Please enter both username and password.');
    }
  });
  
  // CREATE BUTTON
  document.getElementById('createButton').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission
  
    // Get username and password values
    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;
  
    // Check if username and password are not empty
    if (username.trim() !== '' && password.trim() !== '') {
      // Store username and password in session storage
      const encodedUsername = encodeURIComponent(username);
      sessionStorage.setItem('username', encodedUsername);
      //sessionStorage.setItem('password', password);
  
      console.log('User created');
      updateIdentifier();
      createUser(username);
      getUser(username);
    } else {
      // Handle if username or password is empty
      console.log('Please enter both username and password.');
    }
  });
  

document.addEventListener('DOMContentLoaded', updateIdentifier);

function updateIdentifier() {
    let iden = document.getElementById("identifier");
    const username = sessionStorage.getItem('username');

    if (username && username.trim() !== '') {
        iden.textContent = "Welcome " + username;
    } else {
        iden.textContent = "Welcome";
    }
}

// FAKE WEBSOCKET RANDOM GENERATION
// 4 digit number
function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

function updateOtherUserText() {
    const randomNumber = generateRandomNumber();
    const otherUserDiv = document.getElementById('otheruser');

    otherUserDiv.textContent = `User${randomNumber} just logged in`;
}

// Initial call to update the text
updateOtherUserText();

// Function to update text at random intervals between 20 and 30 seconds
function randomizeOtherUserText() {
    setInterval(updateOtherUserText, Math.floor(2000 + Math.random() * 2000));
}

// Start the interval
randomizeOtherUserText();


// External API
function getQuote() {
    fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        const quoteElement = document.getElementById('quote-text');
        quoteElement.textContent = `${data.content} (${data.author})`;
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
    })
}

document.addEventListener('DOMContentLoaded',getQuote())




// HTTP Requests
let user = {}

function getUser(username) {
    const url = `/user?username=${encodeURIComponent(username)}`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`User not found for username: ${username}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data", data);
        if (data && Object.keys(data).length > 0) {
          user = data;
          //localStorage.setItem('username', data['username']);
          localStorage.setItem('chaosContents', JSON.stringify(data['bag']));
          localStorage.setItem('notes', JSON.stringify(data['notepads']));
          localStorage.setItem('campaignData', JSON.stringify(data['campaigns']));
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

  function createUser(username) {
    // Defaults
    let campaignData = {
        'Night of the Zealot':{'Investigator':'Daisy Walker','Notes':""}
    };
    
    let chaosContents = {"Eldersign": 1, 
        "Autofail": 1, "0": 0, "1": 0, 
        "bless": 0, "cultist":0, "curse":0, 
        "elderthing":0,"minus1":0,"minus2":0,
        "minus3":0,"minus4":0,"minus5":0,
        "minus6":0,"minus7":0,"minus8":0,
        "skull":0,"tablet":0};
    
    let notes = {
        'Notepad 1':"",
        'Notepad 2':"",
    };
    
    let userData = {
        [username]: {
            'username': username,
            'campaigns': campaignData,
            'theme': 'default',
            'notepads': notes,
            'bag': chaosContents
        }      
    }
    console.log("Sending out",userData)
    fetch('/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('User created successfully:', data);
          // Handle the response from the server if needed
        })
        .catch(error => {
          console.error('Error creating user:', error);
          // Handle errors here
        });
  }
  