import {
    SAVE, SAVE_DONE, SAVE_ERROR,
    LOAD, LOAD_DONE, LOAD_ERROR
} from "../actions/record";
import { RESET_CONTEXT } from "../actions/storage";

export default function( state = {}, action ) {
    
    const { type, payload } = action;
    switch( type ) {
        
        case RESET_CONTEXT:
            return {};
        case SAVE:
            if ( !state.current ) return state;
            return {
                
                ...state,
                current: {
                    
                    ...state.current,
                    scores: payload.scores,
                    saving: true
                    
                }
                
            };
        case SAVE_DONE:
            if ( !state.current ) return state;
            return {
                
                ...state,
                current: { 
                    
                    ...state.current, 
                    saving: false
                
                    
                }
                
            };
        case SAVE_ERROR:
            if ( !state.current ) return state;
            return {
                
                ...state,
                current: { 
                    
                    ...state.current,
                    saving: false,
                    err: payload
                    
                }
                
            };
        case LOAD:
            return {
                
                ...state,
                current: { when: payload.when, loading: true }
                
            };
        case LOAD_DONE:
            if ( !state.current ) return state;
            if ( !state.current.when === payload.when ) return state;
            return {
                
                ...state,
                current: {
                    
                    ...state.current,
                    scores: payload.scores,
                    loading: false
                    
                }
            }
        case LOAD_ERROR:
            if ( !state.current ) return state;
            if ( !state.current.when === payload.when ) return state;
            return {
                
                ...state,
                current: {
                    
                    ...state.current,
                    loading: false,
                    err: payload
                    
                }
                
            };
            
        default:
            return state;
            
    }

}