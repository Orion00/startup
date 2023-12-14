import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './home.css';
import { Quote } from './quote';

export function Home({username, theme}) {
  const imagePath = `Assets/Themes/${theme}/Palm.png`;

    return (
        <main className="container-fluid bg-secondary">
          <div className="container bg-light align-items-center">
            <div className="row">
              <div className="col-sm text-center">
                <h1 id="identifier">Welcome {username}</h1>
                <h2>Would you like a hand...</h2>
              </div>
          </div>

          <div className="row align-items-center">
            <div className="col-sm">
            <NavLink to="/chaosBag">
              <img src={imagePath} alt="Palm" className="bullet"/>
              <p className='bullet_link'>Pulling a Chaos Token?</p>
            </NavLink>
            </div>
            <div className="col-sm">
            <NavLink to="/drinkPointer">
              <img src={imagePath} alt="Palm" className="bullet"/>
              <p className='bullet_link'>Finding your drink?</p>
            </NavLink>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-sm">
            <NavLink to="/campaignLog">
              <img src={imagePath} alt="Palm" className="bullet"/>
              <p className='bullet_link'>Recording in a campaign log?</p>
            </NavLink>
            </div>
            <div className="col-sm">
            <NavLink to="/notes">
              <img src={imagePath} alt="Palm" className="bullet"/>
              <p className='bullet_link'>Pulling out your notes?</p>
            </NavLink>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-sm">
            <NavLink to="/randomList">
              <img src={imagePath} alt="Palm" className="bullet"/>
              <p className='bullet_link'>Randomly selecting something?</p>
            </NavLink>
            </div>
            <div className="col-sm">
            </div>
          </div>

          <Quote />
{/*         
        


            <div class="row align-items-center">
              <div class="col-sm">
                <a href="randomList.html"><img class="bullet" src="Assets/Themes/generic/Palm.png"></a>
                <a href="randomList.html" class="nav-link bullet_link">Randomly selecting something?</a>
              </div>
              <div class="col-sm">
              </div>
          </div>

          <div class="row align-items-center">
            <div class="col-sm text-center">
              <img class="center meme" src="Assets/ChaosBagMeme.jpeg">
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-sm text-center">
              <p id="quote-text">Loading...</p>
            </div>
          </div>
          <br>
        </div> */}
        </div>
    </main>
    );
}