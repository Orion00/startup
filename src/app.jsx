import React from 'react';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home'
import { ChaosBag } from './chaosBag/chaosBag'
import { DrinkPointer } from './drinks/drinkPointer';
import { CampaignLog } from './campaignLog/campaignLog';
import { Notes } from './notes/notes';
import { RandomList } from './randomList/randomList';
import { Credits } from './credits/credits';


import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
return (
// <nav className='navbar fixed-top navbar-dark'>
//         <div className='navbar-brand'>
//           Simon<sup>&reg;</sup>
//         </div>
//         <menu className='navbar-nav'>
		//   <li className='nav-item'>
			
		//   </li>
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
			<NavLink className='nav-link' aria-current="page" to=''>Login</NavLink>
			<NavLink className="nav-link" aria-current="page" to="chaosBag">Chaos Bag</NavLink>
			<NavLink className="nav-link" aria-current="page" to="drinkPointer">Drinks</NavLink>
			<NavLink className="nav-link" aria-current="page" to="campaignLog">Campaign Log</NavLink>
			<NavLink className="nav-link" aria-current="page" to="notes">Notes</NavLink>
			<NavLink className="nav-link" aria-current="page" to="randomList">Random List</NavLink>
		</div>
		</div>
	</div>
	</nav>
	</header>

	<Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/chaosBag' element={<ChaosBag />} />
          <Route path='/drinkPointer' element={<DrinkPointer />} />
          <Route path='/campaignLog' element={<CampaignLog />} />
		  <Route path='/notes' element={<Notes />} />
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