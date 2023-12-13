import React from 'react';
import { Button } from 'react-bootstrap';

export function Authenticated(props) {
    function logout() {

        // fetch(`/api/auth/logout`, {
        //     method: 'delete',
        //   })
        //     .catch(() => {
        //       // Logout failed. Assuming offline
        //     })
        //     .finally(() => {
        //       localStorage.removeItem('userName');
        //       props.onLogout();
        //     });
        localStorage.removeItem('username');
        props.onLogout();
    }

    return (
        <div className="col-sm">
            <div>Logged in as: {props.username}</div>
            <Button variant="dark" onClick={() => logout()}>Log Out</Button>
        </div>
    )
}