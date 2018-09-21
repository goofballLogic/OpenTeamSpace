import testing from "./testing";
import storage from "./storage";
import createTeam from "./create-team";
import teams from "./teams";
import goals from "./goals";
import { combineReducers } from "redux";
import record from "./record";

const wrapped = combineReducers( { testing, storage, createTeam, teams, goals, record } );

const rootReducer = ( state = {}, action ) => {
    
    console.log( action.type );
    return wrapped( state, action );    
    
};

export default rootReducer;
