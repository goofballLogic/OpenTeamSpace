import React, { Component } from "react";
import { Router, Link } from "./routing";
import { SELF_TEST, map } from "./routes";
import { Nav } from "./routing";
import StorageStatus from "../containers/StorageStatus";
import "./App.css";

import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
    
    render() {
    
        return (

           <div className="app">

                <ToastContainer 
                
                    transition={ Flip }
                    toastClassName="toast"
                    bodyClassName="toast-body"
                    autoClose={ 15000 }
                    progressClassName="toast-progress"
                    newestOnTop={ true } 
                
                />
                <header>
                
                    <StorageStatus />
    
                </header>
                <Nav />
                <Router />
                <Link className="self-test" to={ SELF_TEST }>{ map[ SELF_TEST ].name }</Link>
                
            </div>

        );
        
    }
    
}

export default App;
