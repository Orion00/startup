import React from 'react';
import './chaosBag.css';
import { Token } from './token';
import { Button } from 'react-bootstrap';

export function ChaosBag({userId,chaosContents,theme, onChaosChange}) {
  const [tokenComponents, setTokenComponents] = React.useState([]);
  const [animationInProgress, setAnimationInProgress] = React.useState(false);
  const [selectedToken, setSelectedToken] = React.useState(null);
  const [showToken, setShowToken] = React.useState(false);

    const handImagePath = `helper-assets/Themes/${theme}/Grab.png`;

    const pullToken = () => {
      if (animationInProgress) {
        return;
      }
      if (Object.keys(chaosContents).length === 0) {
        // Check if chaosContents is empty
        alert("Error: Token bag empty. Add a token to the bag before pulling a token.");
        return;
      }
      setAnimationInProgress(true);
    // Remove old token and create new invisible one
    // const oldPulledToken = document.querySelector('.pulled');
    // if (oldPulledToken) {
    //     oldPulledToken.remove();
    // }

    const tokensArray = Object.entries(chaosContents).flatMap(([token, count]) => Array.from({ length: count }, () => token));
    console.log("Tokens pulling from are",tokensArray)
    const randomIndex = Math.floor(Math.random() * tokensArray.length);
    console.log("Selected Token is",tokensArray[randomIndex])
    setSelectedToken(tokensArray[randomIndex])


    // After moving down, move the hand back up
    // setTimeout(function () {
    //     // hand.style.transition = 'transform 2s ease-in-out';
    //     // hand.style.transform = 'translateY(0)';

    //     // // Move the pulled token along with the hand
    //     // pulledToken.style.visibility = "visible"; // Show the pulled token
    //     // pulledToken.style.transition = "transform 2s ease-in-out, opacity 2s ease-in-out"; // CSS transition for transform and opacity
    //     // pulledToken.style.transform = "translateY(0)";
    //     // pulledToken.style.opacity = "1"; // Set opacity to 1 to gradually reveal the token
    //     // pulledToken.style.transition = 'transform 2s ease-in-out';
    //     // pulledToken.style.transform = 'translateY(0)';
    // }, 2000); // Adjust this timing to sync with the hand's animation

    // Reset animation state
    setTimeout(function () {
        setAnimationInProgress(false);
        // setSelectedToken(null)
        setShowToken(true);
    }, 2000); // Total duration of both up and down animation
    }

  const changeChaosTokens = (tokenName, choice) => {
      const updatedChaosContents = { ...chaosContents };
  
      if (choice === "add") {
        updatedChaosContents[tokenName] += 1;
      } else if (choice === "remove") {
        updatedChaosContents[tokenName] -= 1;
      }
  
      onChaosChange(updatedChaosContents);
    };

    React.useEffect(() => {
      const updatedTokenComponents = Object.keys(chaosContents).flatMap(tokenName => {
        const quantity = chaosContents[tokenName];
        return Array.from({ length: quantity }, (_, index) => (
          <Token key={`${tokenName}-${index}`} tokenName={tokenName} removeTokens={changeChaosTokens} />
        ));
      });
  
      setTokenComponents(updatedTokenComponents);
    }, [chaosContents]);

    return (
        <main className="container-fluid bg-secondary">
        <div className="container bg-light align-items-center">
          <div className="row">
            <div className="col-lg text-center pull">
              <br />
              <Button className="btn btn-success btn-lg" onClick={pullToken}>Pull a token</Button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg text-center hand">
              <img className={`meme ${animationInProgress ? 'animate-hand' : ''}`} src={handImagePath} />
            </div>  
          </div>

          <div className="row align-items-center text-center">
              <div className="col-sm token-spot">
              {/* Display the token with fade-in animation */}
              {selectedToken && (
                <div className={`pulled ${showToken ? 'fade-in' : 'pulled'}`}>
                  <Token className="token pulled" tokenName={selectedToken} />
                </div>
              )}
            </div>
          </div>
          <div className="row align-items-center text-center">
            <div className="col-sm">
              <img className="meme bag-image" src="/helper-assets/Chaos Bag/Bag1b.png" />
            </div>
          </div>
            <div className="row align-items-center text-center">
              <div className="col-lg">
                {/* <button className="btn btn-secondary" onclick=stirBag()>Stir Bag</button>  */}
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#chaosselector">
                  Add Token
                </button>
                
                {/* <!-- Modal --> */}
                <div className="modal fade" id="chaosselector" tabIndex="-1" aria-labelledby="chaosselector" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Select a token</h1>
                        <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                      </div>
                      <div className="modal-body">
                        <div className="col-sm">
                            {/* addTokenAndIncrement */}
                          <Token tokenName={'Eldersign'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'Autofail'} addTokens={changeChaosTokens}/>
                          <Token tokenName={1} addTokens={changeChaosTokens}/>
                          <Token tokenName={0} addTokens={changeChaosTokens}/>
                          <Token tokenName={'minus1'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'minus2'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'minus3'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'minus4'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'minus5'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'minus6'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'minus7'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'minus8'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'skull'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'cultist'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'tablet'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'elderthing'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'bless'} addTokens={changeChaosTokens}/>
                          <Token tokenName={'curse'} addTokens={changeChaosTokens}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* onclick=toggleDeleteMode() */}
                <button className="btn btn-danger" id="deleteButton">Remove Token</button>

            </div>

            <div className="row align-items-center">
              <div className="col-sm bag">
                {tokenComponents}
              </div>
            </div>
      <br />
    </div>


        {/* <!-- Find new hat (per theme) --> */}
</div>
    </main>
    )
}