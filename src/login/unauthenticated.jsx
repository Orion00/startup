import React from 'react';
import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');

    async function login() {
        if (username.trim() === '' || password.trim() === '') {
            alert("Please enter a username and a password")
        } else{
        // Add fetch request
        //If successful, update root username
            console.log("Login",username)
            // let retrievedUserData = await getGeneric(username);
            // console.log("Retrieved user data is",retrievedUserData)
            // setStorage(retrievedUserData);
            props.onLogin(username)
            props.onWSChange(username)


        }
}

function create() {

}


    async function getGeneric() {
        // const url = `/user?username=${encodeURIComponent(username)}`;
        // try {
        //   const response = await fetch(url);
        //   if (!response.ok) {
        //     throw new Error(`User not found for username: ${username}`);
        //   }
        //   const data = await response;
        //   if (data) {
        //     return data;
        //   } else {
        //     console.error('User data is empty');
        //     return null;
        //   }
        // } catch (error) {
        //   console.error("Error fetching user data:", error);
        //   alert("Username not found. Please check your username and try again.");
        //   return null;
        // }
      }
      
    function setStorage(user) {
        console.log("Our user is",user)
        localStorage.setItem('username',JSON.stringify(user['username']));
        localStorage.setItem('chaosContents', JSON.stringify(user['bag']));
        localStorage.setItem('notepads', JSON.stringify(user['notepads']));
        localStorage.setItem('campaignData', JSON.stringify(user['campaigns']));
        localStorage.setItem('id', JSON.stringify(user['_id']));
      }
//   // Check if username and password are not empty
//   if (username.trim() !== '' && password.trim() !== '') {
//     // Store username in session storage
//     const encodedUsername = encodeURIComponent(username);
//     // sessionStorage.setItem('username', encodedUsername);
//     let retrievedUserData = await login(username,password);
//   } else {
//     // Handle if username or password is empty
//     console.log('Please enter both username and password.');
//   }


    return (
        <div className="col-sm">
            <div className='row g-1 align-items-center'>
                <div className="col-auto">
                    <label htmlFor="name" className="col-form-label">Username</label>
                </div>
                <div className="col-auto">
                    <input type="text" value={username} id="name" className="form-control" onChange={(e) => setUsername(e.target.value)} name="login" placeholder="Username" autoComplete="username" aria-describedby="passwordHelpInline" />
                </div>
            </div>

            <div className='row g-2 align-items-center'>
                <div className="col-auto">
                    <label htmlFor="password" className="col-form-label">Password</label>
                </div>
                <div className="col-auto">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" placeholder="password" autoComplete="current-password" aria-describedby="passwordHelpInline" />
                </div>
            </div>

            <div className='row g-0 align-items-center'>
                <div className="col-auto">
                    <Button variant="light" onClick={() => login()}>Login</Button>
                </div>
                <div className="col-auto">
                    <Button variant="dark" onClick={() => create()}>Create</Button>
                </div>
            </div>
    </div>

    )
}