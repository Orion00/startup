import React from 'react';
import { Button } from 'react-bootstrap';

// TODO: Make saved changes go through and onto DB

export function Notepad({ name, value: initialValue, onSave, onClear }) {
    const [text, setText] = React.useState(initialValue);
  
    const handleInputChange = (event) => {
      setText(event.target.value);
    };
  
    const handleSave = () => {
      onSave(name, text); // Pass the 'text' value to onSave
    };
  
    const handleClear = () => {
      setText('');
      onClear(name);
    };
  
    return (
      <div className="col-lg text-center">
        <div className="form-group">
          <label>{name}</label>
          <textarea
            className="form-control"
            rows="3"
            value={text}
            onChange={handleInputChange}
          ></textarea>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    );
  }