import React from 'react';
import Button from 'react-bootstrap/Button';
import { createRoutesFromChildren } from 'react-router-dom';

export function Unauthenticated(props) {
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');

async function loginOrCreate(choice) {
    if (username.trim() === '' || password.trim() === '') {
      alert("Please enter a username and a password");
    } else {
      let response;
      if (choice === "login") {
        const url = '/auth/login';
        response = await fetch(url, {
          method: 'post',
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      } else if (choice === "create") {
        let userData = {
            'username': username,
            'password': password,
            'campaigns': props.campaignData,
            'theme': props.theme,
            'notepads': props.notepads,
            'bag': props.chaosContents   
        }
        try {
          const createUserResponse = await fetch('/auth/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          const data = await createUserResponse.json();
          console.log('User created successfully:', data);
          // Handle the response from the server if needed
        } catch (error) {
          console.error('Error creating user:', error);
          // Handle errors here
        }
      }
  
      if (response && response.ok) {
        try {
          let retrievedUserData = await getGeneric(username);
          console.log("Retrieved user data is", retrievedUserData);
          setStorage(retrievedUserData);
          if (retrievedUserData !== null) {
            props.onLogin(username);
            props.onWSChange(username);
          }
        } catch (error) {
          console.error('Error retrieving user data:', error);
          // Handle errors while retrieving user data here
        }
      }
    }
  }



    async function getGeneric() {
        const url = `/user?username=${encodeURIComponent(username)}`;

        try {
          const response = await fetch(url);
      
          if (!response.ok) {
            throw new Error(`User not found for username: ${username}`);
          }
      
          const data = await response.json();
      
          if (data) {
            return data;
          } else {
            console.error('User data is empty');
            // Possibly handle empty data here
            return null;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Display a user-friendly message to the user
          alert("Username not found. Please check your username and try again.");
          return null;
        }
      }
      
    function setStorage(user) {
        console.log("Our user is",user)
        localStorage.setItem('username',user['username']);
        localStorage.setItem('chaosContents', user['bag']);
        localStorage.setItem('notepads', user['notepads']);
        localStorage.setItem('campaignData', user['campaigns']);
        localStorage.setItem('theme', user['theme']);
        localStorage.setItem('id', user['_id']);
      }


    return (
        <div className="col-sm">
            <div className='row g-1 align-items-center'>
                <div className="col-auto">
                    <label htmlFor="name" className="col-form-label form-control-label-sm">Username</label>
                </div>
                <div className="col-auto">
                    <input type="text" value={username} id="name" className="form-control form-control-sm" onChange={(e) => setUsername(e.target.value)} name="login" placeholder="Username" autoComplete="username" aria-describedby="passwordHelpInline" />
                </div>
            </div>

            <div className='row g-2 align-items-center'>
                <div className="col-auto">
                    <label htmlFor="password" className="col-form-label">Password</label>
                </div>
                <div className="col-auto">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control form-control-sm" placeholder="password" autoComplete="current-password" aria-describedby="passwordHelpInline" />
                </div>
            </div>

            <div className='row g-0 align-items-center'>
                <div className="col-auto">
                    <Button variant="light" onClick={() => loginOrCreate("login")}>Login</Button>
                </div>
                <div className="col-auto">
                    <Button variant="dark" onClick={() => loginOrCreate("create")}>Create</Button>
                </div>
            </div>
    </div>

    )
}