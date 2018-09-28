import { LOAD, LOAD_DONE, LOAD_ERROR } from "../actions/metrics";
import { RESET_CONTEXT } from "../actions/storage";

export default function( state = {}, action ) {
    
    const { type, payload } = action;
    switch( type ) {
        
        case RESET_CONTEXT:
            return {};
            
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