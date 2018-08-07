import { STORAGE, map } from "../components/routes";
import { toast } from "react-toastify";

export function requireStorage( { nav, storageContext } ) {
    
    const isReady = storageContext && storageContext.connected && storageContext.selectedFolder;
    if ( isReady ) { return; }
    toast( "Please sign in so that we know where to store your data." );
    const route = map[ STORAGE ];
    const url = new URL( window.location.href );
    url.searchParams.set( "view", STORAGE );
    url.searchParams.set( "ref", window.location.href );
    nav( url.toString(), route.name );
    
}