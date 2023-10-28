"use strict"
let animationInProgress = false;

function spin() {
    console.log("trying to spin")
    if (!animationInProgress) {
        console.log("SPINNING")
        const image = document.querySelector('.meme');
        const randomDegree = Math.floor(Math.random() * 360); // Generate a random number between 0 and 360

        image.style.transition = 'transform 1s'; // Smooth transition
        image.style.transform = `rotate(${randomDegree}deg)`; // Apply the random degree rotation

        animationInProgress = true;

        // Detect the end of the transition
        image.addEventListener('transitionend', () => {
            animationInProgress = false;
        }, { once: true });
    }
}

