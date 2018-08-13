import { toast } from "react-toastify";

import { CHANGE_CONTEXT } from "../actions/storage";

const validateStorage = store => next => action => {

    const { type, payload } = action;
    if ( type === CHANGE_CONTEXT && payload.selectedFolder ) {
        
        const { storage = {} } = store.getState();
        const { connected } = storage;
        if ( !( connected && connected.id === payload.selectedFolder ) ) {
            
            toast( "Hang tight - checking that folder for you" );
            console.log( "Need to validate storage", payload.selectedFolder );
            return;
               
        }
        
    }
    return next( action );
    
};
export default validateStorage;