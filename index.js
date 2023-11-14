"use strict"

const express = require('express');
const app = express();

// Serve Website
app.use(express.static('public'))
app.listen(4000, function() {console.log("Server is running")})


// Endpoints
app.use(express.json())

let campaignData = {
    'Night of the Zealot':{'Investigator':'Daisy Walker','Notes':""},
    'Path to Carcosa':{'Investigator':'Mark Harrigan','Notes':""}
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
    'test': {
        'username': 'test',
        'campaigns': campaignData,
        'theme': 'default',
        'notepads': notes,
        'bag': chaosContents
    }
    
}

//// User
// Create User
app.post('/createUser', (req, res) => {
  const newUser = req.body;
  const newUsername = Object.keys(newUser)[0];

  // Check if the username already exists
  if (userData.hasOwnProperty(newUsername)) {
      res.status(409).json({ error: 'Username already exists' });
  } else {
      // Add the new user to the existing userData
      userData[newUsername] = newUser[newUsername];
      res.json({ message: 'User created successfully' });
  }
});

// Get User
app.get('/user', function (req, res) {
    const username = req.query.username; 
    // Check if the requested username exists in userData
    if (userData.hasOwnProperty(username)) {
      const user = userData[username];
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

//// Chaos Bag
// Add or Remove Token
app.post('/updateBag', (req, res) => {
  const data = req.body;
  const username = data['username'];
  const updatedBag = data['bag'];

  // Check if the username exists
  if (userData.hasOwnProperty(username)) {
      // Update the 'bag' property of the user data
      userData[username]['bag'] = updatedBag;
      console.log("Successfully updated the bag");
      res.json({ message: 'Bag updated successfully' });
  } else {
      res.status(404).json({ error: 'User not found' });
  }
});

//// Campaign Log
// Add, Remove, Save, Clear Campaigns
app.post('/updateCampaigns', (req, res) => {
  const data = req.body;
  const username = data['username'];
  const updatedCampaigns = data['campaigns'];

  // Check if the username exists
  if (userData.hasOwnProperty(username)) {
      // Update the 'bag' property of the user data
      userData[username]['campaigns'] = updatedCampaigns;
      console.log("Successfully updated campaigns");
      res.json({ message: 'Campaigns updated successfully' });
  } else {
      res.status(404).json({ error: 'User not found' });
  }
});

//// Notepads
// Add, Remove, Save, Clear Notes
app.post('/updateNotepads', (req, res) => {
  const data = req.body;
  const username = data['username'];
  const updatedNotepads = data['notes'];

  // Check if the username exists
  if (userData.hasOwnProperty(username)) {
      // Update the 'bag' property of the user data
      userData[username]['notepads'] = updatedNotepads;
      console.log("Successfully updated notes");
      res.json({ message: 'notes updated successfully' });
  } else {
      res.status(404).json({ error: 'User not found' });
  }
});