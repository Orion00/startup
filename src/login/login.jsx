import React from 'react';
import { WebsocketMessage } from './websocketMessage';
import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';

// Fix Logout to use API Request
// Fix Login and create API Requests
// Make WS actually connect
// Fix logout to change overall username

export function Login({ username, authState, onAuthChange, chaosContents, notepads, campaignData, theme, onChaosChange }) {
  const [wsMsg, setWSMsg] = React.useState('');

  const onWSChange = (e) => {
    setWSMsg(e);
  };


    return (
        // {authState !== AuthState.Unknown && <h1>Welcome to Simon</h1>}
        <div className="row bg-success text-white align-items-center">
          {authState === AuthState.Unknown && <h1>Welcome to Simon</h1>}

              {authState === AuthState.Unauthenticated && (
              <Unauthenticated
                username={username} wsMsg={wsMsg}
                onLogin={(loginUsername) => {
                  onAuthChange(loginUsername, AuthState.Authenticated);
                }}
                onWSChange={(newWsMsg) => {setWSMsg(newWsMsg)}}
                notepads={notepads} campaignData={campaignData} theme={theme} chaosContents={chaosContents}
                onChaosChange={() => onChaosChange(updatedChaosContents)}/>
            )}
            {authState === AuthState.Authenticated && (
              <Authenticated username={username} 
              onLogout={() => onAuthChange(username, AuthState.Unauthenticated, chaosContents)}/>)}
          <WebsocketMessage wsMsg={wsMsg}/>
        </div>
    )
}
