import React from 'react';
import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');

    async function loginOrCreateUser(choice) {
        if (username.trim() !== '' && password.trim() !== '') {
            // Add fetch request
            //If successful, update root username
            props.onLogin(username)
        }
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
                    <Button variant="light" onClick={() => loginOrCreateUser("Login")}>Login</Button>
                </div>
                <div className="col-auto">
                    <Button variant="dark" onClick={() => loginOrCreateUser("Create")}>Create</Button>
                </div>
            </div>
            <div value={username}>Username is {username}</div>
            <input
            className='form-control'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='your@email.com'
          />
    </div>

    )
}