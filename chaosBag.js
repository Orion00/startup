"use strict"


let delete_mode = false;
let animationInProgress = false;
let ChaosContents = {"Elder Sign": 1, "Autofail": 1, "0": 1, "1": 1, "bless": 0, "cultist":2, "curse":0, "elderthing":0,"minus1":1,"minus2":2,"minus3":1,"minus4":1,"minus5":0,"minus6":0,"minus7":0,"minus8":0,"skull":1,"tablet":0};

localStorage.setItem("ChaosContents",JSON.stringify(ChaosContents))

function pullToken() {
    if (animationInProgress) {
        // If an animation is in progress, do nothing
        return;
    }
    
    animationInProgress = true;
    console.log("Animation in progress",animationInProgress)
    const grabImage = document.querySelector(".hand img");

    // Reset the image to its initial position
    grabImage.style.transform = "translateY(0)";

    setTimeout(function () {
        grabImage.style.transition = "transform 2s ease-in-out";
        grabImage.style.transform = "translateY(150px)";

        setTimeout(function () {
            grabImage.style.transition = "transform 2s ease-in-out";
            grabImage.style.transform = "translateY(0)";
        }, 2300); // How long to wait before going back up
    }, 50); // How long to wait before the animation starts

    setTimeout(function () {
        animationInProgress = false;
        console.log("Animation in progress",animationInProgress)    
    },4500)
}

function stirBag() {
    if (animationInProgress) {
        // If an animation is in progress, do nothing
        return;
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
    ChaosContents = JSON.parse(localStorage.getItem("ChaosContents"));
    console.log(ChaosContents,"a");
    for (const key in ChaosContents) {
        const times = ChaosContents[key];
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
        src = input.src
    }
    const parentElement = document.querySelector(".bag");
    let nToken = createImg(src);
    parentElement.appendChild(nToken);

}

function removeToken(event) {
    // Make sure to check bless/curse
    if (delete_mode) {
        const target = event.target;
        target.remove();
        toggleDeleteMode();
    }
}


// HELPER FUNCTIONS
function createImg(src) {
    let el = document.createElement('img');
    el.classList.add("token");

    // Check if the input src contains the full path or just the image name
    if (src.includes('.png')) {
        // Full path provided
        el.src = src;
    } else {
        // Only the image name provided, append it to the path
        el.src = `/Assets/Chaos Bag/${src}.png`;
    }

    el.addEventListener("click", removeToken); // Assuming removeToken is a defined function
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