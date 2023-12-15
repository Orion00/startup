import React from 'react';
import { Button } from 'react-bootstrap';

export function Notepad({name, value}) {
    return(
        <div className='col-lg text-center'>
        <div className='form-group'>
            <label>{name}</label>
            <textarea className='form-control' rows='3' value={value}></textarea>
             <Button variant='success'>Save</Button>
             <Button variant='danger'>Clear</Button>
        </div>
        </div>
       

    )
}