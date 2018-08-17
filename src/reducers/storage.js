import { CHANGE_CONTEXT, RESET_CONTEXT, CONNECTING, CONNECTED, DISCONNECTED } from "../actions/storage";

export default function( state = { context: {} }, action ) {

    const withNewContext = newContext => ( { ...state, context: newContext } );
    
    const { type, payload = {} } = action;
    switch ( type ) {
        
        case CHANGE_CONTEXT:
            return withNewContext( { ...state.context, ...payload } );
            
        case RESET_CONTEXT:
            return withNewContext( {} );

        case DISCONNECTED:
            return withNewContext( { ...state.context, connected: undefined, connecting: undefined } );

        case CONNECTING:
            return withNewContext( { ...state.context, connecting: payload } );
        
        case CONNECTED:
            return withNewContext( { ...state.context, connecting: undefined, connected: payload } );

        default:
            return state;
            
    }    

}