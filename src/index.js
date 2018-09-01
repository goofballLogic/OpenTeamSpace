import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import middlewarez from "./middleware/index";

import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import * as reducers from "./reducers/index";

const initialState = {};
const rootReducer = combineReducers( reducers );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers( applyMiddleware( thunk, ...middlewarez ) );

const store = createStore( 
    
    rootReducer,
    initialState,
    enhancers

);

const Element = () => <Provider store={store}>

    <App {...store.getState()} />
    
</Provider>;


ReactDOM.render( 
    
    <Element />, 
    document.getElementById("root"),
    () => document.body.classList.add( "app-initialized" )
    
);
registerServiceWorker();
