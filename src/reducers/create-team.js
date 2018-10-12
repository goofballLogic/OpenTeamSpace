import { POPULATE, CREATE, CREATE_SUCCEEDED, CREATE_FAILED } from "../actions/team";

import shortid from "shortid";

const ensureId = 
    state => 
        state.id
            ? state 
            : { ...state, id: shortid() };
    
export default function( state = {}, action ) {
    
    const { type, payload } = action;
    switch( type ) {
        
        case POPULATE:
            return ensureId( {
                
                ...state,
                ...payload
            
            } );
        case CREATE:
            return {
                
                ...state,
                err: undefined,
                creating: true
                
            };
        case CREATE_SUCCEEDED:
            return {
                
                created: { ...state }
                
            };
        case CREATE_FAILED:
            return {
                
                ...state,
                creating: undefined,
                ...payload
                
            };
        default:
            return { ...state };
            
    }

}