"use strict"


let delete_mode = false;
let animationInProgress = false;

let chaosContents = JSON.parse(localStorage.getItem('chaosContents'))

if (!chaosContents || Object.keys(chaosContents).length === 0) {
    chaosContents = {"Eldersign": 1, 
    "Autofail": 1, "0": 1, "1": 1, 
    "bless": 0, "cultist":2, "curse":0, 
    "elderthing":0,"minus1":1,"minus2":2,
    "minus3":1,"minus4":1,"minus5":0,
    "minus6":0,"minus7":0,"minus8":0,
    "skull":1,"tablet":0};

    localStorage.setItem('chaosContents', JSON.stringify(chaosContents));
  }


function pullToken() {
    if (animationInProgress) {
        // If an animation is in progress, do nothing
        return;
    }
    const parentElement = document.querySelector(".bag");
    const imgElements = parentElement.getElementsByClassName("token")
    if (imgElements.length <= 0) {
        alert("Error: Token bag empty. Add a token to the bag before pulling a token.")
        return;
    }
    animationInProgress = true;

    // Remove old token and create new invisible one
    const oldPulledToken = document.querySelector('.pulled');
    if (oldPulledToken) {
        oldPulledToken.remove();
    }
    
    const randomIndex = Math.floor(Math.random() * imgElements.length);
    const randomImage = imgElements[randomIndex];

    const tokenSpot = document.querySelector(".token-spot");
    let nToken = createImg(randomImage.src.split('/').pop().replace('.png', ''));
    nToken.classList.add("pulled");
    tokenSpot.appendChild(nToken);

    const pulledToken = document.querySelector('.pulled');
    const hand = document.querySelector('.hand');
    
    // Get the initial position of the hand
    const initialHandPosition = hand.getBoundingClientRect().top;

    // Move the hand down
    hand.style.transition = 'transform 2s ease-in-out';
    hand.style.transform = 'translateY(150px)';

    // After moving down, move the hand back up
    setTimeout(function () {
        hand.style.transition = 'transform 2s ease-in-out';
        hand.style.transform = 'translateY(0)';

        // Move the pulled token along with the hand
        pulledToken.style.visibility = "visible"; // Show the pulled token
        pulledToken.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out"; // CSS transition for transform and opacity
        pulledToken.style.transform = "translateY(0)";
        pulledToken.style.opacity = "1"; // Set opacity to 1 to gradually reveal the token
        // pulledToken.style.transition = 'transform 2s ease-in-out';
        // pulledToken.style.transform = 'translateY(0)';
    }, 2000); // Adjust this timing to sync with the hand's animation

    // Reset animation state
    setTimeout(function () {
        animationInProgress = false;
    }, 4000); // Total duration of both up and down animation
}


function stirBag() {
    if (animationInProgress) {
        // If an animation is in progress, do nothing
        return;
    }

    const oldPulledToken = document.querySelector('.pulled');
    if (oldPulledToken) {
        oldPulledToken.remove();
    }

    animationInProgress = true;
    const grabImage = document.querySelector(".hand img");

    // Reset the image to its initial position
    grabImage.style.transition = "none";
    grabImage.style.transform = "translate(0, 0)";

    // Move down for 2 seconds
    grabImage.style.transition = "transform 2s ease-in-out";
    grabImage.style.transform = "translate(0, 150px)";

    // Listen for the 'transitionend' event to move left after moving down
    grabImage.addEventListener("transitionend", function() {
        // Move left for 1 second after the downward movement
        grabImage.style.transition = "transform 1s ease-in-out";
        grabImage.style.transform = "translate(-50px, 150px)";

        // Listen for the 'transitionend' event to move right after moving left
        grabImage.addEventListener("transitionend", function() {
            // Move right for 1.5 seconds after moving left
            grabImage.style.transition = "transform 1.5s ease-in-out";
            grabImage.style.transform = "translate(50px, 150px)";

            // Listen for the 'transitionend' event to move up after moving right
            grabImage.addEventListener("transitionend", function() {
                // Move up for 2 seconds after moving right
                grabImage.style.transition = "transform 2s ease-in-out";
                grabImage.style.transform = "translate(0, 0)";

                // After moving up, reset the animation flag
                grabImage.addEventListener("transitionend", function() {
                    animationInProgress = false;
                    // Remove all event listeners
                    grabImage.removeEventListener("transitionend", this);
                });
            });
        });
    });
}

// SETUP PAGE
function populateTokens() {
    chaosContents = JSON.parse(localStorage.getItem("chaosContents"));
    for (const key in chaosContents) {
        const times = chaosContents[key];
        for (let i = 0; i < times; i++) {
            addToken(key);
        }
    }
}

document.addEventListener('DOMContentLoaded', populateTokens);

// ADD AND REMOVE CAPABILITIES
function addToken(input) {
    let src;
    if (typeof(input)=== 'string') {
        src = input
    } else {
        //src = input.src
        src = input.src.split('/').pop().replace('.png', '')
    }
    const parentElement = document.querySelector(".bag");
    let nToken = createImg(src);
    nToken.addEventListener("click", removeToken);
    parentElement.appendChild(nToken);
    return src  
}

function addTokenAndIncrement(input) {
    let src = addToken(input);
    chaosContents[src] += 1;
    console.log("Total",src,"is",chaosContents[src]);
    localStorage.setItem('chaosContents', JSON.stringify(chaosContents));
}

function removeToken(event) {
    // Make sure to check bless/curse
    if (delete_mode) {
        const target = event.target;
        target.remove();
        toggleDeleteMode();
        let src = target.src.split('/').pop().replace('.png', '')
        chaosContents[src] -= 1;
        localStorage.setItem('chaosContents', JSON.stringify(chaosContents));
        console.log("Total",src,"is",chaosContents[src]);
    }
}


// HELPER FUNCTIONS
function createImg(src) {
    let el = document.createElement('img');
    el.classList.add("token");
    el.src = `/Assets/Chaos Bag/${src}.png`;
    return el;
}

function toggleDeleteMode() {
    delete_mode = !delete_mode;
    //Displays if in "delete mode"
    if (delete_mode) {
      document.getElementById('deleteButton').style.backgroundColor = 'pink';
    } else {
      document.getElementById('deleteButton').style.backgroundColor = '';
    }
}