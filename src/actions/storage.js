import { STORAGE, map } from "../components/routes";
import { toast } from "react-toastify";

export const CHANGE_CONTEXT = "src/actions/storage.CHANGE_CONTEXT";
export const RESET_CONTEXT = "src/actions/storage.RESET_CONTEXT";

export function requireStorage( { nav, storageContext, message, forceReload } ) {
    
    const isReady = storageContext && storageContext.connected && storageContext.selectedFolder;
    if ( isReady ) { return; }
    message = message || "Please sign in so that we know where to store your data.";
    toast( message );
    const route = map[ STORAGE ];
    const url = new URL( window.location.href );
    url.searchParams.set( "view", STORAGE );
    if ( !url.searchParams.get( "ref" ) )
        url.searchParams.set( "ref", window.location.href );
    if ( forceReload )
        url.searchParams.set( "cid", Date.now() );
    nav( url.toString(), route.name );
    
}

export const changeContext = context => ( { type: CHANGE_CONTEXT, payload: context } );

export const resetContext = ( { err } ) => {
    
console.log( err );
    toast( `An error occurred: ${err.message || "Unknown"}` );
    return { type: RESET_CONTEXT };
    
};