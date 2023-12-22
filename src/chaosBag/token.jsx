import React from 'react';
import './chaosBag.css';

export function Token({tokenName, addTokens, removeTokens}) {
    const imagePath = `helper-assets/Chaos Bag/${tokenName}.png`;
    const handleClick = () => {
        if (addTokens) {
          addTokens(tokenName,"add");
        } else if (removeTokens) {
          removeTokens(tokenName,"remove");
        }
      };
    return ( <img src={imagePath} className='token' data-bs-dismiss="modal" onClick={handleClick}/>)
}

