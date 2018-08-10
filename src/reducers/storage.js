import { CHANGE_CONTEXT, RESET_CONTEXT } from "../actions/storage";

export default function( state = { context: {} }, action ) {

    const { type, payload } = action;
    switch ( type ) {
        
        case CHANGE_CONTEXT:
            const context = { ...state.context, ...payload };
            return {
                
                ...state,
                context
                
            };
            
        case RESET_CONTEXT:
            return {
                
                ...state,
                context: {}
                
            };

        default:
            return state;
            
    }    

}