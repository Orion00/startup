import React from 'react';

export function WebsocketMessage() {
    const [wsMsg, setWSMsg] = React.useState('words');

    // Adjust the webSocket protocol to what is being used for HTTP
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // Display that we have opened the webSocket
    socket.onopen = (event) => {
    console.log("We've connected to the web socket")
    };

    // Display messages we receive from our friends
    socket.onmessage = async (event) => {
        const text = await event.data.text();
        const username = JSON.parse(text);
        updateOtherUserText(username.name);
    };

    // If the webSocket is closed then disable the interface
    socket.onclose = (event) => {
    console.log("We've closed the connection")
    };

    // Send a message over the webSocket
    function sendMessage() {
        const username = document.getElementById('name').value;
        if (!!username) {
            socket.send(`{"name":"${username}"}`);
        }
    }

    function generateRandomNumber() {
        return Math.floor(Math.random() * 4);
      }
      
      function updateOtherUserText(newName) {
        const randomNumber = generateRandomNumber();
      
        switch (randomNumber) {
          case 0:
            setWSMsg(`User ${newName} just logged in`);
            break;
          case 1:
            setWSMsg(`Happy to see you ${newName}!`);
            break;
          case 2:
            setWSMsg(`User ${newName} just joined us`);
            break;
          case 3:
            setWSMsg(`Watch out! ${newName} is here to party`);
            break;
        }
      }

    return (
          <div className="col-sm">{wsMsg}</div>
    )
}