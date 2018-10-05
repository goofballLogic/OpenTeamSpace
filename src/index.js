import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import meta from "./meta.json";

import middlewarez from "./middleware/index";

import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import reducers from "./reducers/index";

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers( applyMiddleware( thunk, ...middlewarez ) );

const store = createStore( 
    
    reducers,
    initialState,
    enhancers

);

const Element = () => <Provider store={store}>

    <App {...store.getState()} />
    
</Provider>;

document.querySelector( ".version" ).textContent = meta.version;

ReactDOM.render( 
    
    <Element />, 
    document.getElementById("root"),
    () => document.body.classList.add( "app-initialized" )
    
);
registerServiceWorker();
