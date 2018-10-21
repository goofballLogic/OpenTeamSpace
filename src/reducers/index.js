import testing from "./testing";
import storage from "./storage";
import createTeam from "./create-team";
import teams from "./teams";
import goals from "./goals";
import record from "./record";
import metrics from "./metrics";
import { DISCONNECTED, RESET_CONTEXT } from "../actions/storage";

import { combineReducers } from "redux";


const wrapped = combineReducers( { testing, storage, createTeam, teams, goals, record, metrics } );

const justStorage = combineReducers( { testing, storage } );

const rootReducer = ( state = {}, action ) => {
    
    const { type } = action;
    if ( type === DISCONNECTED || type === RESET_CONTEXT ) 
        return justStorage( state, action );
    else
        return wrapped( state, action );

};

export default rootReducer;