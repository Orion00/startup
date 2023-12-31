"use strict"
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const DB = require('./database.js');
const express = require('express');
const { peerProxy } = require('./peerProxy.js');
const app = express();

// Serve Website
app.use(express.static('public'))
const httpService = app.listen(4000, function() {console.log("Server is running")})



// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.json());

// let campaignData = {
//     'Night of the Zealot':{'Investigator':'Daisy Walker','Notes':""},
//     'Path to Carcosa':{'Investigator':'Mark Harrigan','Notes':""}
// };

// let chaosContents = {"Eldersign": 1, 
//       "Autofail": 1, "0": 0, "1": 0, 
//       "bless": 0, "cultist":0, "curse":0, 
//       "elderthing":0,"minus1":0,"minus2":0,
//       "minus3":0,"minus4":0,"minus5":0,
//       "minus6":0,"minus7":0,"minus8":0,
//       "skull":0,"tablet":0};

// let notes = {
//     'Notepad 1':"",
//     'Notepad 2':"",
// };

// let userData = {
//     'test': {
//         'username': 'test',
//         'campaigns': campaignData,
//         'theme': 'default',
//         'notepads': notes,
//         'bag': chaosContents
//     }
    
// }

//// User
// Create User
// app.post('/createUser', async (req, res) => {
//     // TODO: Replace with hashed password
//   const newPassword = "123";

//   const newUser = req.body;
//   newUser['hashedpassword'] = newPassword;
//   const newUsername = Object.keys(newUser)[0];

//   const foundUser = await DB.getUser(newUsername);
//   // Check if username exists
//   if (Object.keys(foundUser).length === 0) {
//     // Add user to DB
//     DB.createUser(newUser)
//     res.json({ message: 'User created successfully' });
//   } else {
//     res.status(409).json({ error: 'Username already exists' });
//   }
// });

// Endpoints
app.post('/auth/create', async (req, res) => {
  const userExists = await DB.getUser(req.body.username);
  if (userExists) {
    res.status(409).send({ msg: 'Username already exists' });
  } else {
    const user = await DB.createUser(req.body);
    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
      message: 'User created successfully'
    });
  }
});

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  console.log("This is the user we found while using /login")
  console.log(user)
  if (user) {
    //console.log("Password matchup",req.body.password, user.password)
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    } else {
      res.status(401).send({ msg: 'Incorrect password' });
      console.error('Incorrect password');
      return
    }
  } else {
    res.status(404).send({ msg: 'Username not found' });
    console.error('Username not found');
    return
  }
  
});

// Get User
app.get('/user', async (req, res) => {
  console.log("This is the user we found while using /user")
  console.log(req.query.username)
    // const username = req.query.username;
    // const foundUser = await DB.getUser(username);
    // res.json(foundUser);
  const userExists = await DB.getUser(req.query.username);
  console.log("userExists",userExists)
  if (userExists) {
    delete userExists.password;
    res.setHeader('Content-Type', 'application/json');
    res.json(userExists);
  } else {
    res.status(404).send({ msg: 'Username not found' });
  }
  });


//// Chaos Bag
// Add or Remove Token
app.post('/updateBag', (req, res) => {
  const data = req.body;
  const updatedBag = data['bag'];
  console.log("Bag",updatedBag)

  const editedUser = DB.editUser(data,'bag')
  res.json(editedUser)
  
});

//// Campaign Log
// Add, Remove, Save, Clear Campaigns
app.post('/updateCampaigns', (req, res) => {
  const data = req.body;
  const updatedCampaigns = data['campaigns'];
  console.log("Campaign",updatedCampaigns)

  const editedUser = DB.editUser(data,'campaigns')
  res.json(editedUser)
});

//// Notepads
// Add, Remove, Save, Clear Notes
app.post('/updateNotepads', (req, res) => {
  const data = req.body;
  const updatedNotepads = data['notepads'];
  console.log("Notepads",updatedNotepads)

  const editedUser = DB.editUser(data,'notepads')
  res.json(editedUser)
});

peerProxy(httpService);