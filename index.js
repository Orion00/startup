"use strict"

const express = require('express');
const app = express();

// Serve Website
app.use(express.static('public'))
app.listen(3500, function() {console.log("Server is running")})


// Endpoints
app.use(express.json())

let campaignData = {
    'Night of the Zealot':{'Investigator':'Daisy Walker','Notes':""}
};

let chaosContents = {"Eldersign": 1, 
    "Autofail": 1, "0": 1, "1": 1, 
    "bless": 0, "cultist":2, "curse":0, 
    "elderthing":0,"minus1":1,"minus2":2,
    "minus3":1,"minus4":1,"minus5":0,
    "minus6":0,"minus7":0,"minus8":0,
    "skull":1,"tablet":0};

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
app.post('/createUser', (req, res) => {
    const newUser = req.body;
    const newUsername = Object.keys(newUser)[0];
  
    // Handle the userData on the server side

    if (userData.hasOwnProperty(newUsername)) {
        res.status(409).json({ error: 'Username already exists' });
      } else {
        
        userData = {
            ...userData,
            ...newUser,
          };
        res.json({ message: 'User created successfully' });
      }
  });

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

//let campaignData = {}

//// Campaign Log
// app.post('/campaignData', function (req, res) {
//     // cname (campaign name) contains object {name of campaign: Investigator: 'str', Notes: 'str'}
//     let entry = { cname: req.body.cname}
//     campaignData.push(entry)
//     console.log(campaignData)
// })

// app.get('/campaignData', function(req, res){
//     res.send(campaignData)
//   });

//// Notepads

//// Chaos Bag