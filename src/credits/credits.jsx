import React from 'react';
import './credits.css';

export function Credits() {
    return (
        <main className="container-fluid bg-secondary">
            <div className="container bg-light align-items-center">
                <div className="row">
                    <div className="col-sm text-center">
                    <h1>Image Credits</h1>
                    </div>
                </div>
            

            <div className="row text-center">
                <h2>Arkham Memes from <a href="https://www.facebook.com/mythosbusters/" target="_blank" className="text-success">Mythos Busters</a></h2>
                <div className="col-sm text-center">
                    <img src="helper-assets/ChaosBagMeme.jpeg"  alt="Up by 8 meme" className="imagecredit"/> 
                </div>
            </div>

            <div className="row text-center">
                <h2>Tentacles courtesy of Phoenix Bowers</h2>
                <div className="col-sm text-center">
                <img className="icon imagecredit" src="helper-assets/Themes/Tentacle/Grab.png" alt="Grabbing tentacle" />
                </div>
                <div className="col-sm text-center">
                <img className="icon imagecredit" src="helper-assets/Themes/Tentacle/Palm.png" alt="Tentacle palm" />
                </div>
                <div className="col-sm text-center">
                <img className="icon imagecredit" src="helper-assets/Themes/Tentacle/Point.png" alt="Pointing tentacle" />
                </div>
            </div>

            <div className="row text-center">
                <div className="col-sm text-center">
                <img className="icon imagecredit" src="helper-assets/Themes/BW/Grab.png" alt="Grabbing tentacle" />
                </div>
                <div className="col-sm text-center">
                <img className="icon imagecredit" src="helper-assets/Themes/BW/Palm.png" alt="Tentacle palm" />
                </div>
                <div className="col-sm text-center">
                <img className="icon imagecredit" src="helper-assets/Themes/BW/Point.png" alt="Pointing tentacle" />
                </div>
            </div>

        <div className="row text-center">
        <h2>Thanks to Colin Gubler for giving me a hand</h2>
            <div className="col-sm text-center">
            <img className="icon imagecredit" src="helper-assets/Themes/generic/Grab.png" alt="Grabbing hand" />
            </div>
            <div className="col-sm text-center">
            <img className="icon imagecredit" src="helper-assets/Themes/generic/Palm.png" alt="Human palm" />
            </div>
            <div className="col-sm text-center">
            <img className="icon imagecredit" src="helper-assets/Themes/generic/Point.png" alt="Pointing hand" />
            </div>
        </div>

        <div className="row text-center">
        <h2>And of course, DALLE-2's work</h2>
            <div className="col-sm text-center">
            <img src="helper-assets/AIGenerated/CthulhuBusiness.png" alt="Painting of Cthulhu in a business suit on a zoom call" className="icon imagecredit" />
            </div>
        </div>
        <br />
        </div>
    </main>
    )
}