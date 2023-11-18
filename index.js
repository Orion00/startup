"use strict"

const DB = require('./database.js');
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
app.post('/createUser', async (req, res) => {
    // TODO: Replace with hashed password
  const newPassword = "123";

  const newUser = req.body;
  newUser['hashedpassword'] = newPassword;
  const newUsername = Object.keys(newUser)[0];

  const foundUser = await DB.getUser(newUsername);
  // Check if username exists
  if (Object.keys(foundUser).length === 0) {
    // Add user to DB
    DB.createUser(newUser)
    res.json({ message: 'User created successfully' });
  } else {
    res.status(409).json({ error: 'Username already exists' });
  }
});

// Get User
app.get('/user', async (req, res) => {
    const username = req.query.username;
    const foundUser = await DB.getUser(username);
    res.json(foundUser);
  });


//// Chaos Bag
// Add or Remove Token
app.post('/updateBag', (req, res) => {
  const data = req.body;
  // const username = data['username'];
  const updatedBag = data['bag'];

  // console.log("Data",data)
  // console.log("Username",username)
  console.log("Bag",updatedBag)

  const editedUser = DB.editUser(data,'bag')
  res.json(editedUser)
  
});

//// Campaign Log
// Add, Remove, Save, Clear Campaigns
app.post('/updateCampaigns', (req, res) => {
  const data = req.body;
  // const username = data['username'];
  const updatedCampaigns = data['campaigns'];

  // console.log("Data",data)
  // console.log("Username",username)
  console.log("Campaign",updatedCampaigns)

  const editedUser = DB.editUser(data,'campaigns')
  res.json(editedUser)
});

//// Notepads
// Add, Remove, Save, Clear Notes
app.post('/updateNotepads', (req, res) => {
  // const data = req.body;
  // const username = data['username'];
  // const updatedNotepads = data['notes'];

  // // Check if the username exists
  // if (userData.hasOwnProperty(username)) {
  //     // Update the 'bag' property of the user data
  //     userData[username]['notepads'] = updatedNotepads;
  //     console.log("Successfully updated notes");
  //     res.json({ message: 'notes updated successfully' });
  // } else {
  //     res.status(404).json({ error: 'User not found' });
  // }

  const data = req.body;
  // const username = data['username'];
  const updatedNotepads = data['notepads'];

  // console.log("Data",data)
  // console.log("Username",username)
  console.log("Notepads",updatedNotepads)

  const editedUser = DB.editUser(data,'notepads')
  res.json(editedUser)
});