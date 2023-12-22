import React from 'react';
import './chaosBag.css';
import { Token } from './token';

export function ChaosBag({userId,chaosContents,theme, onChaosChange}) {
    const handImagePath = `helper-assets/Themes/${theme}/Grab.png`;
    const changeChaosTokens = (tokenName, choice) => {
      console.log("Token name is",tokenName,"number is",chaosContents[tokenName])
      if (choice === "add") {
        chaosContents[tokenName] += 1;
      } else if(choice === "remove") {
        chaosContents[tokenName] -= 1;
      }
      console.log("Token name is",tokenName,"number is now",chaosContents[tokenName])
      onChaosChange(chaosContents);
    }

    const tokenComponents = Object.keys(chaosContents).flatMap(tokenName => {
      const quantity = chaosContents[tokenName];
      console.log("Using basic")
      return Array.from({ length: quantity }, (_, index) => (
        <Token key={`${tokenName}-${index}`} tokenName={tokenName} removeTokens={changeChaosTokens}/>
      ));
    });

    React.useEffect(() => {
      console.log("Keys are",Object.keys(chaosContents));
      console.log("elder sign is",chaosContents['Eldersign'])
    },[])





    return (
        <main className="container-fluid bg-secondary">
        <div className="container bg-light align-items-center">
          <div className="row">
            <div className="col-lg text-center pull">
                {/* onclick=pullToken() */}
              <button type="button" className="btn btn-success btn-lg" id="pulltoken">Pull a token</button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg text-center hand">
              <img className="meme" src={handImagePath} />
            </div>  
          </div>

          <div className="row align-items-center text-center">
            <div className="col-sm token-spot">
              <img className="token pulled" src="helper-assets/Chaos Bag/0.png" />
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
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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