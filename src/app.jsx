import React from 'react';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home'
import { ChaosBag } from './chaosBag/chaosBag'
import { DrinkPointer } from './drinks/drinkPointer';
import { CampaignLog } from './campaignLog/campaignLog';
import { Notes } from './notes/notes';
import { RandomList } from './randomList/randomList';
import { Credits } from './credits/credits';
import { Login } from './login/login';
import { AuthState } from './login/authState';


import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
	const storedChaosContents = localStorage.getItem('chaosContents');
	const parsedChaosContents = storedChaosContents ? JSON.parse(storedChaosContents) : {};

	const storedNotepads = localStorage.getItem('notepads');
	const parsedNotepads = storedNotepads ? JSON.parse(storedNotepads) : {};

	const storedCampaignData = localStorage.getItem('campaignData');
	const parsedCampaignData = storedCampaignData ? JSON.parse(storedCampaignData) : {};

	const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
	const [chaosContents, setChaosContents] = React.useState(parsedChaosContents);
	const [notepads, setNotepads] = React.useState(parsedNotepads);
	const [campaignData, setCampaignData] = React.useState(parsedCampaignData);
	const [userId, setUserId] = React.useState(localStorage.getItem('id') || '');
	const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'generic');

	const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
  	const [authState, setAuthState] = React.useState(currentAuthState);

	//In Theme Box, use this
	// <button onClick={() => changeTheme('newTheme')}>Change Theme</button>
	const changeTheme = (newTheme) => {
		setTheme(newTheme);
	  };
	
	const onChaosChange = (updatedChaosContents) => {
		setChaosContents(updatedChaosContents);
	  };

return (
<BrowserRouter>
<header>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
	<div className="container-fluid">
		<a className="navbar-brand">Arkham Hand</a>
		<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
		<div className="navbar-nav">
			<NavLink className='nav-link' aria-current="page" to=''>Home</NavLink>
			<NavLink className="nav-link" aria-current="page" to="chaosBag">Chaos Bag</NavLink>
			<NavLink className="nav-link" aria-current="page" to="drinkPointer">Drinks</NavLink>
			<NavLink className="nav-link" aria-current="page" to="campaignLog">Campaign Log</NavLink>
			<NavLink className="nav-link" aria-current="page" to="notes">Notes</NavLink>
			<NavLink className="nav-link" aria-current="page" to="randomList">Random List</NavLink>
		</div>
		</div>
	</div>
	</nav>
	<Login username={username} authState={authState} onAuthChange={(username, authState) => {
                  setAuthState(authState);
                  setUsername(username);
                }}
			onChaosChange={chaosContents}
			chaosContents={chaosContents}  notepads={notepads} campaignData={campaignData} theme={theme}/>
	</header>


	<Routes>
          <Route path='/' element={<Home username={username} theme={theme}/>} exact />
          <Route path='/chaosBag' element={<ChaosBag userId={userId} chaosContents={chaosContents} theme={theme}/>} />
          <Route path='/drinkPointer' element={<DrinkPointer theme={theme}/>} />
          <Route path='/campaignLog' element={<CampaignLog userId={userId} campaignData={campaignData}/>} />
		  <Route path='/notes' element={<Notes userId={userId} notepads={notepads}/>} />
          <Route path='/randomList' element={<RandomList />} />
		  <Route path='/credits' element={<Credits />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

		<footer>
        <div className="row bg-success text-white align-items-center text-center">
          <div className="col-sm">
            Created by Orion Bowers
          </div>
          <div className="col-sm">
            <a className="nav-link" href="https://github.com/Orion00/startup">GitHub</a>
          </div>
          <div className="col-sm">
			<NavLink className={"nav-link"} to="credits">ImageCredits</NavLink>
			{/* TODO: Find our what this was used for in image credits? */}
			{/* className='navigationList */}
          </div>
        </div>        
      </footer>
	</BrowserRouter>
)
}

// TODO: Fix this to match the rest of the theme
function NotFound() {
	return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }