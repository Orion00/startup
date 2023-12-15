import React from 'react';
import './notes.css';
import { Notepad } from './notepad';

export function Notes({notepads}) {
    return (
        <main className="container-fluid bg-secondary">
    <div className="container bg-light align-items-center">
          <div className="row">
            <div className="col-sm text-center">
              <h1>Notepads</h1>
            </div>
          </div>

      <div className="row" id="notes">
        <Notepad name={} value={}/>
      </div>

      <div className="row">
        <div className="col-sm text-center">
            {/* onclick=addNote() */}
          <button type="submit" className="btn btn-success">Add Notepad</button>
          <button type="submit" className="btn btn-danger" id="deleteButton">Remove Notepad</button>
        </div>
      </div>

      <br />
  </div>

</main>  
    )
}