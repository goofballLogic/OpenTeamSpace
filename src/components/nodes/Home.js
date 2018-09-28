import React, { Component } from "react";
import "./Home.css";
class Home extends Component {
    
    render() {
        
        const { className } = this.props;
        return <article className={`home ${className || ""}`}>

            <div className="splash">
                <video src="./Very-Open-Space.mp4" controls autoPlay loop poster="./Very-Open-Space.jpg"></video>
            </div>
            <h1>Welcome to OpenTeamSpace for Developers</h1>
            <p>
                This tool is intended to help with self-reflection and evaluation. If there's anything we can do to make the experience more seamless, please let us know.
            </p>
        
        </article>;
        
    }
    
}
export default Home;