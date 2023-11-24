"use strict"

// SAVING USERNAME AND PASSWORD

// Login Button
document.getElementById('login').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form submission

  // Get username and password values
  const username = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  // Check if username and password are not empty
  if (username.trim() !== '' && password.trim() !== '') {
    // Store username in session storage
    const encodedUsername = encodeURIComponent(username);
    // sessionStorage.setItem('username', encodedUsername);
    let retrievedUserData = await login(username,password);
  } else {
    // Handle if username or password is empty
    console.log('Please enter both username and password.');
  }
});
  
// CREATE BUTTON
document.getElementById('createButton').addEventListener('click',async function (e) {
  e.preventDefault(); // Prevent form submission

  // Get username and password values
  const username = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  // Check if username and password are not empty
  if (username.trim() !== '' && password.trim() !== '') {
      // Store username and password in session storage
      const encodedUsername = encodeURIComponent(username);
      //sessionStorage.setItem('password', password);

      console.log('User created');
      updateIdentifier();
      // TODO: make sure setting this won't screw up the user later
      createUser(encodedUsername,password);
      let retrievedUserData = await getGeneric(encodedUsername);
      if (retrievedUserData) {
        setStorage(retrievedUserData);
        // sessionStorage.setItem('username', encodedUsername);
      } else {
        console.log("Error creating a new user")
      }
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
  return Math.floor(Math.random() * 4);
}

function updateOtherUserText(newName) {
  const randomNumber = generateRandomNumber();
  const otherUserDiv = document.getElementById('otheruser');

  switch (randomNumber) {
    case 0:
      otherUserDiv.textContent = `User ${newName} just logged in`;
      break;
    case 1:
      otherUserDiv.textContent = `Happy to see you ${newName}!`;
      break;
    case 2:
      otherUserDiv.textContent = `User ${newName} just joined us`;
      break;
    case 3:
      otherUserDiv.textContent = `Watch out! ${newName} is here to party`;
      break;
  }
}



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

// async function getGeneric(username) {

//   const url = `/user?username=${encodeURIComponent(username)}`;
//   return fetch(url).
//   // const response = await fetch(url)
//   // console.log("Response from server is",response.body)
//   //  if (response.ok) {
//   //   return response
//   //  } else {
//   //   // TODO: Figure out what this returns
//   //   return;
//   //  }
  
//   then((response) => {if (!response.ok) {
//     console.log("response not okay", response)
//     throw new Error(`User not found for username: ${username}`);
//   }}).
// then((data) => {
//       console.log("Received data", data);
//       if (data) {
//         return data
//       } else {
//         // Handle the case where user data is empty
//         console.error('User data is empty');
//       }
//     })
//     .catch((error) => {
//       // Handle errors here
//       console.error("Error fetching user data:", error);
//       // Display a user-friendly message to the user
//       alert("Username not found. Please check your username and try again.");
//     });
// }

async function getGeneric(username) {
  const url = `/user?username=${encodeURIComponent(username)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`User not found for username: ${username}`);
    }

    const data = await response.json();

    if (data) {
      return data;
    } else {
      console.error('User data is empty');
      // Possibly handle empty data here
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Display a user-friendly message to the user
    alert("Username not found. Please check your username and try again.");
    return null;
  }
}


function setStorage(user) {
  console.log("Our user is",user)
  localStorage.setItem('username',JSON.stringify(user['username']));
  localStorage.setItem('chaosContents', JSON.stringify(user['bag']));
  localStorage.setItem('notepads', JSON.stringify(user['notepads']));
  localStorage.setItem('campaignData', JSON.stringify(user['campaigns']));
  //localStorage.setItem('id', JSON.stringify(user['_id']));
}

  // TODO: Use local cache to create user instead of defaults
function createUser(username,password) {
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
          'username': username,
          'password': password,
          'campaigns': campaignData,
          'theme': 'default',
          'notepads': notes,
          'bag': chaosContents   
  }

  console.log("Sending out", userData)
  fetch('/auth/create', {
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

async function login(user_name,password) {
  const url = '/auth/login';
  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify({username : user_name, password : password}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  
  if (response.ok) {
    updateIdentifier();
    let retrievedUserData = await getGeneric(user_name);
    setStorage(retrievedUserData);
    sendMessage()
  }
}

// Websocket Functions
// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  // appendMsg('system', 'websocket', 'connected');
  console.log("We've connected to the web socket")
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const username = JSON.parse(text);
  updateOtherUserText(username.name)
};

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  console.log("We've closed the connection")
};

// Send a message over the webSocket
function sendMessage() {
  const username = document.getElementById('name').value;
  if (!!username) {
    socket.send(`{"name":"${username}"}`);
  }
}