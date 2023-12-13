import React from 'react';
import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');

    function loginUser() {

    }

    function createUser() {
        
    }

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
                    <Button variant="light" onClick={() => loginUser()}>Login</Button>
                </div>
                <div className="col-auto">
                    <Button variant="dark" onClick={() => createUser()}>Create</Button>
                </div>
            </div>
        
        

    </div>
    )
}