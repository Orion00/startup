import React from 'react';
import './chaosBag.css';

export function Token({number}) {
    const imagePath = `Assets/Chaos Bag/${number}.png`;
    return ( <img src={imagePath} className='token' data-bs-dismiss="modal"/>)
}