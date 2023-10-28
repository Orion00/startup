// SAVING USERNAME AND PASSWORD
document.getElementById('login').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get username and password values
    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    // Check if username and password are not empty
    if (username.trim() !== '' && password.trim() !== '') {
        // Store username and password in session storage
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);

        console.log('Username and password saved to session storage.');
        updateIdentifier();
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
    return Math.floor(1000 + Math.random() * 9000);
}

function updateOtherUserText() {
    const randomNumber = generateRandomNumber();
    const otherUserDiv = document.getElementById('otheruser');

    otherUserDiv.textContent = `User${randomNumber} just logged in`;
}

// Initial call to update the text
updateOtherUserText();

// Function to update text at random intervals between 20 and 30 seconds
function randomizeOtherUserText() {
    setInterval(updateOtherUserText, Math.floor(2000 + Math.random() * 2000)); // Random interval between 20 and 30 seconds (in milliseconds)
}

// Start the interval
randomizeOtherUserText();
