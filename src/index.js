import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import * as reducers from "./reducers/index";
const initialState = {};
const rootReducer = combineReducers( reducers );
const store = createStore( 
    
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);

const Element = () => <Provider store={store}>

    <App />
    
</Provider>;

ReactDOM.render( <Element />, document.getElementById('root'));
registerServiceWorker();
