"use strict"

const express = require('express');
const app = express();

// Serve Website
app.use(express.static('public'))
app.listen(3500, function() {console.log("Server is running")})


// Endpoints
app.use(express.json())

//// Campaign Log
app.post('/campaignlog', function (req, res) {})

//// Notepads

//// Chaos Bag