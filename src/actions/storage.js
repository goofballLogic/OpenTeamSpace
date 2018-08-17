import { toast } from "react-toastify";
import { fetchIndex, initializeFolder, isCurrentApplication, updateAccessRecord } from "./storage-logic";

export const CHANGE_CONTEXT = "src/actions/storage.CHANGE_CONTEXT";
export const RESET_CONTEXT = "src/actions/storage.RESET_CONTEXT";
export const DISCONNECTED = "src/actions/storage.DISCONNECTED";
export const CONNECTING = "src/actions/storage.CONNECTING";
export const CONNECTED = "src/actions/storage.CONNECTED";

export const changeContext = context => ( { type: CHANGE_CONTEXT, payload: context } );

export const resetContext = ( args = {} ) => {
    
    const { err } = args;
    if ( err ) {
        
        const message = err.message 
            || ( ( typeof err.error === "string" ) && err.error )
            || "We're not sure what went wrong but we've recorded it so we can fix it ASAP.";
        toast( `An error occurred. ${message}` );
        
    }
    return { type: RESET_CONTEXT };
    
};

export const disconnect = () => ( { type: DISCONNECTED } );

const connectionStarted = folder => ( { type: CONNECTING, payload: folder } );
const connectionCompleted = folder => ( { type: CONNECTED, payload: folder } );
const connectionAbandoned = reason => dispatch => {
    
    toast( `${reason} Please choose or create a different folder.` );
    dispatch( disconnect() );
    dispatch( changeContext( { selectedFolder: undefined } ) );

};


export const connect = ( provider, folder ) => async dispatch => {

    // let the user know that we are connecting
    dispatch( connectionStarted( folder ) );
    let index = await fetchIndex( provider, folder );
    if ( index && !isCurrentApplication( index ) ) {
        
        // the folder already contains a file called _index.json so we can't use it. Possibly a sibling application.
        dispatch( connectionAbandoned( `Sorry, that folder is being used by something else (${index.owner || "Unknown"}).` ) );
        return;
        
    }
    if ( !index ) {
        
        // need to initialize the folder for use with this application
        try {

            index = await initializeFolder( provider, folder );
            dispatch( connectionCompleted( folder ) );
            
        } catch( ex ) {
            
            dispatch( connectionAbandoned( `An error occurred initializing the folder: ${ex.message}.` ) );
            return;
            
        }

    }
    
    // update access record
    updateAccessRecord( provider, folder );
    
    // connection is successful
    dispatch( connectionCompleted( folder ) );
    
};

export function observeContextChanges( before = {}, after = {}) {
    
    // async because we don't want to block callers
    return async dispatch => {
    
        if ( ( after.connected || after.connecting ) && !after.provider ) {
            
            // abort the connection if a new provider is chosen
            dispatch( disconnect() );
            return;
            
        }  
        const beforeConnectedId = before.connected && before.connected.current.id;
        const { provider, selectedFolder } = after;
        const selectedFolderId = selectedFolder && selectedFolder.current.id;
        if ( !selectedFolderId || beforeConnectedId === selectedFolderId ) {
        
            // no folder is selected, or the same folder was reselected
            return;
            
        }
        if ( beforeConnectedId ) {
            
            // disconnect from previous folder
            dispatch( disconnect() );
            
        }
        // attempt to connect to the new folder
        dispatch( connect( provider, selectedFolder ) );
        
    };
    
}