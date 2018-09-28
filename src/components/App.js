import React, { Component } from "react";
import { Link } from "./routing";
import { SELF_TEST, HOME, matchRoute } from "./routes";

import Router from "../containers/Router";
import Nav from "../containers/Nav";
import StorageStatus from "../containers/StorageStatus";
import CurrentTeam from "../containers/CurrentTeam";

import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import "./App.css";

class App extends Component {
    
    render() {
    
        return (

           <div className="app">

                <ToastContainer 
                
                    transition={ Flip }
                    toastClassName="toast"
                    bodyClassName="toast-body"
                    autoClose={ 5000 }
                    progressClassName="toast-progress"
                    newestOnTop={ true } 
                
                />
                <header>
                
                    <Link className="home" to={ HOME }>
                    
                        <img src="./logo-small-transparent.png" alt="home logo" />
                    
                    </Link>
                    <StorageStatus />
    
                </header>
                <div className="body">

                    <div className="side-bar">
                    
                        <Nav {...this.props} />
                        <CurrentTeam />
                        
                    </div>
                    <Router {...this.props} />
                    
                </div>
                <Link className="self-test" to={ SELF_TEST }>{ matchRoute( SELF_TEST ).name }</Link>
                
            </div>

        );
        
    }
    
}

export default App;