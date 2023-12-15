import React from 'react';
import './notes.css';
import { Notepad } from './notepad';

export function Notes({notepads, onUpdateNotepads}) {
    const [updatedNotepads, setUpdatedNotepads] = React.useState(notepads);

  const handleSave = (key, text) => {
    const updated = { ...updatedNotepads, [key]: text };
    setUpdatedNotepads(updated);
  };

  const handleClear = (key) => {
    const updated = { ...updatedNotepads, [key]: '' };
    setUpdatedNotepads(updated);
    saveChanges()
  };

  const saveChanges = () => {
    // Update the main notepads state in the parent component
    // Assuming onUpdateNotepads is a function passed from the parent
    onUpdateNotepads(updatedNotepads);
  };
    return (
        <main className="container-fluid bg-secondary">
    <div className="container bg-light align-items-center">
          <div className="row">
            <div className="col-sm text-center">
              <h1>Notepads</h1>
            </div>
          </div>

          <div className="row" id="notes">
          {Object.entries(notepads).map(([key, value]) => (
            <Notepad
              key={key}
              name={key}
              value={updatedNotepads[key]}
              onSave={handleSave}
              onClear={handleClear}
            />
          ))}
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