import React from 'react';
import { WebsocketMessage } from './websocketMessage';
import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';

// Fix Logout to use API Request
// Fix Login/craete to use API Request

export function Login({ username, authState, onAuthChange }) {
    return (
        // {authState !== AuthState.Unknown && <h1>Welcome to Simon</h1>}
        <div className="row bg-success text-white align-items-center">
          {authState === AuthState.Unknown && <h1>Welcome to Simon</h1>}

              {authState === AuthState.Unauthenticated && (
              <Unauthenticated
                username={username}
                onLogin={(loginUsername) => {
                  onAuthChange(loginUsername, AuthState.Authenticated);
                }}
              />
            )}
            {authState === AuthState.Authenticated && (<Authenticated username={username} onLogout={() => onAuthChange(username, AuthState.Unauthenticated)}/>)}
            {authState === AuthState.Authenticated && (
          <Authenticated username={username} onLogout={() => onAuthChange(username, AuthState.Unauthenticated)} />
        )}
          <WebsocketMessage />
        </div>
    )
}