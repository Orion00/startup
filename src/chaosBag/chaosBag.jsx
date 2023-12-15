import React from 'react';
import './chaosBag.css';
import { Token } from './token';

export function ChaosBag({userId,chaosContents,theme}) {
    const handImagePath = `Assets/Themes/${theme}/Grab.png`;
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
              <img className="token pulled" src="Assets/Chaos Bag/0.png" />
            </div>
          </div>
          <div className="row align-items-center text-center">
            <div className="col-sm">
              <img className="meme bag-image" src="/Assets/Chaos Bag/Bag1b.png" />
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
                          <Token number={'Eldersign'} />
                          <Token number={'Autofail'} />
                          <Token number={1} />
                          <Token number={0} />
                          <Token number={'minus1'} />
                          <Token number={'minus2'} />
                          <Token number={'minus3'} />
                          <Token number={'minus4'} />
                          <Token number={'minus5'} />
                          <Token number={'minus6'} />
                          <Token number={'minus7'} />
                          <Token number={'minus8'} />
                          <Token number={'skull'} />
                          <Token number={'cultist'} />
                          <Token number={'tablet'} />
                          <Token number={'elderthing'} />
                          <Token number={'bless'} />
                          <Token number={'curse'} />
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
 
              </div>
      </div>
      <br />
    </div>


        {/* <!-- Find new hat (per theme) --> */}
</div>
    </main>
    )
}