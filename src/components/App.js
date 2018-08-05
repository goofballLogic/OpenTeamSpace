import React, { Component } from "react";
import { Router, Link } from "./routing";
import { SELF_TEST, map } from "./routes";
import { Nav } from "./routing";
import "./App.css";


class App extends Component {
    
    render() {
    
        return (

           <div className="app">

                <Nav />
                <Router />
                <Link className="self-test" to={ SELF_TEST }>{ map[ SELF_TEST ].name }</Link>
                
            </div>

        );
        
    }
    
}

export default App;
