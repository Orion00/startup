"use strict"

const express = require('express');
const app = express();

// Serve Website
app.use(express.static('public'))
app.listen(3500, function() {console.log("Server is running")})


// Endpoints
app.use(express.json())

let campaignData = {}

//// Campaign Log
app.post('/campaignData', function (req, res) {
    // cname (campaign name) contains object {name of campaign: Investigator: 'str', Notes: 'str'}
    let entry = { cname: req.body.cname}
    campaignData.push(entry)
    console.log(campaignData)
})

app.get('/campaignData', function(req, res){
    res.send(campaignData)
  });

//// Notepads

//// Chaos Bag