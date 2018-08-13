import { toast } from "react-toastify";

export const CHANGE_CONTEXT = "src/actions/storage.CHANGE_CONTEXT";
export const RESET_CONTEXT = "src/actions/storage.RESET_CONTEXT";

export const changeContext = context => ( { type: CHANGE_CONTEXT, payload: context } );

export const resetContext = ( { err } ) => {
    
    const message = ( err && ( 
        
        err.message || ( 
            
            ( typeof err.error === "string" ) && err.error
            
        )
        
    ) ) || "We're not sure what went wrong but we've recorded it so we can fix it ASAP.";
    
    toast( `An error occurred. ${message}` );
    return { type: RESET_CONTEXT };
    
};