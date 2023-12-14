import React from 'react';
import Button from 'react-bootstrap/Button';
import './randomList.css';

export function RandomList() {
    const [randomList, setRandomList] = React.useState('');

    function randomizeList() {
        const result = randomList.split('\n');
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        setRandomList(result.join('\n'));
    }

    return (
        <main className="container-fluid bg-secondary">
        <div className="container bg-light align-items-center">
              <div className="row">
                <div className="col-sm text-center">
                    <br />
                  <h1>Randomize a list</h1>
                </div>
              </div>
    
          <div className="row">
            <div className="col-lg text-center">
              <div className="form-group">
                <label htmlFor="randomlist">Input each item on its own line</label>
                <textarea className="form-control" id="randomlist" rows="3" value={randomList} onChange={(e) => {setRandomList(e.target.value)}}></textarea>
              </div>
              <Button variant="success" onClick={() => randomizeList()}>Randomize</Button>
              <Button variant="danger" onClick={() => setRandomList("")}>Clear</Button>
            </div>     
          </div>
    
          <br />
      </div>
    
    </main>  
    )
}