import { toast } from "react-toastify";

export const CHANGE_CONTEXT = "src/actions/storage.CHANGE_CONTEXT";
export const RESET_CONTEXT = "src/actions/storage.RESET_CONTEXT";
export const DISCONNECTED = "src/actions/storage.DISCONNECTED";
export const CONNECTING = "src/actions/storage.CONNECTING";
export const CONNECTED = "src/actions/storage.CONNECTED";

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

export const disconnect = () => ( { type: DISCONNECTED } );
export const connect = selectedFolder => dispatch => {
    
    dispatch( { type: CONNECTING } );
    console.log( new Error( "Not yet implemented" ) );
    
    
};

export function observeSelectedFolder( before, after ) {
    
    return dispatch => {
    
        const beforeConnectedId = before.connected && before.connected.id;
        const { selectedFolder } = after;
        const selectedFolderId = selectedFolder && selectedFolder.current.id;
        if ( !selectedFolderId || beforeConnectedId === selectedFolderId ) {
        
            // no folder is selected, or the same folder was reselected
            return;
            
        } 
        
        // unblock other actions
        setTimeout( () => {

            console.log( "Connecting..." );
            
            if ( beforeConnectedId ) {
                
                // disconnect from previous folder
                dispatch( disconnect() );
                
            }
            // attempt to connect to the new folder
            dispatch( connect( selectedFolder ) );

        } );
        
    };
    
}