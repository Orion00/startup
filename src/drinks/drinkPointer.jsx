import Button from 'react-bootstrap/Button';
import React from 'react';
import './drinkPointer.css';

export function DrinkPointer({theme}) {
    const imagePath = `/helper-assets/Themes/${theme}/Point.png`;
    const [animationInProgress, setAnimation] = React.useState(true)
    const [randomDegree, setRandomDegree] = React.useState(0);

    // function spin() {
    //     console.log("trying to spin")
    //     if (!animationInProgress) {
    //         console.log("SPINNING")
    //         const image = document.querySelector('.meme');
    //         const randomDegree = Math.floor(Math.random() * 360);

    //         image.style.transition = 'transform 1s'; // Smooth transition
    //         image.style.transform = `rotate(${randomDegree}deg)`;

    //         setAnimation(true);

    //         // Detect the end of the transition
    //         image.addEventListener('transitionend', () => {
    //             setAnimation(false);
    //         }, { once: true });
    //     }
    //}

    React.useEffect(() => {
      if (animationInProgress) {
        const timer = setTimeout(() => {
          setRandomDegree(Math.floor(Math.random() * 360));
          setAnimation(false);
        }, 500); // Time for the animation to complete in milliseconds
        return () => clearTimeout(timer);
      }
    }, [animationInProgress]);

    function spin() {
      if (!animationInProgress) {
        setAnimation(true);
      }
    }
  
    const rotationStyle = {
      transition: 'transform 1s',
      transform: `rotate(${randomDegree}deg)`
    };
  
     
    return (
        <main className="container-fluid bg-secondary">
    <div className="container bg-light align-items-center">
          <div className="row">
            <div className="col-sm text-center">
              <h1>Did you leave your drink there?</h1>
            </div>
          </div>

      <div className="row">
        <div className="col-lg text-center point">
          <img className="meme" src={imagePath} style={rotationStyle} alt="Point"/>
        </div>
      </div>
      <div className="row">
        <div className="col-lg text-center">
          <Button variant='success' onClick={spin}>Spin</Button>
        </div>
      </div>
      <br />
  </div>
</main>
    )
}