import React from 'react';
import './chaosBag.css';

export function Token({tokenName}) {
    const imagePath = `helper-assets/Chaos Bag/${tokenName}.png`;
    return ( <img src={imagePath} className='token' data-bs-dismiss="modal"/>)
}

