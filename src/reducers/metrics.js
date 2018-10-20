import { LOAD, LOAD_DONE, LOAD_ERROR } from "../actions/metrics";
import { RESET_CONTEXT } from "../actions/storage";
import { SELECT_TEAM } from "../actions/teams";
import { SAVE_DONE } from "../actions/record";

const defaultState = {};

export default function( state = defaultState, action ) {
    
    const { type, payload } = action;
    switch( type ) {
        
        case SELECT_TEAM:
            return defaultState;
            
        case RESET_CONTEXT:
            return defaultState;
        
        case SAVE_DONE:
            return defaultState;
            
        case LOAD:
            return {
                
                when: payload.when,
                loading: true
                
            };
            
        case LOAD_DONE:
            if ( !state.when === payload.when ) return state;
            return {
                
                ...state,
                data: payload.data,
                loading: false
                
            };
            
        case LOAD_ERROR:
            if ( !state.when === payload.when ) return state;
            return {
                
                ...state,
                loading: false,
                err: payload

            };
            
        default:
            return state;
            
    }

}