import React from "react";
import "./Home.css";

const Home = 

    ( { className, showGettingStarted, onCloseGettingStarted, onDismissGettingStarted, storageContext } ) => 
    
        <article className={`home ${className || ""}`}>

            <div className="splash">

                <video src="./Very-Open-Space.mp4" controls autoPlay loop poster="./Very-Open-Space.jpg"></video>

            </div>
            <h1>Welcome to OpenTeamSpace for Developers</h1>
            <p>

                This tool is intended to help with self-reflection and evaluation. If there's anything we can do to make the experience more seamless, please let us know.

            </p>
            { showGettingStarted && <dialog id="getting-started" ref={x => showGettingStarted( storageContext, x )}>
            
                <h2>Getting started</h2>
                <p>In order to create or load a team, you need to select a place to store your data.</p>
                <p><b>N.B.</b> If you use Google Drive storage, you will need to allow popups when your browser alerts you.</p>
                <button onClick={ onCloseGettingStarted }>OK</button>
                <button onClick={ onDismissGettingStarted }>Don't show again</button>

            </dialog>}

        </article>;

export default Home;