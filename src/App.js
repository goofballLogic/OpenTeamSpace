import React, { Component } from "react";
import { Router, UNMATCHED } from "./routing";

import { Nav } from "./routing";
import "./App.css";


class App extends Component {
    render() {
        return (

           <div className="app">

                <Nav />
                <Router />

            </div>

        );
    }
}

export default App;
