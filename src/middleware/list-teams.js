import { 
    FETCH_TEAMS, fetchTeamsError, fetchTeamsData
} from "../actions/teams";
import { listContainers } from "../logic/storage";

async function invokeListContainers( store, provider ) {

    const { storage } = store.getState();
    const { context } = storage || {};
    const { connected } = context || {};
    
    // create a new team file
    if ( !connected ) throw new Error( "No active data connection was found" );
    if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );
    return listContainers( connected, provider, "team" );

}

const listTeams = store => next => action => {

    const { type, provider } = action;
    next( action );
    switch( type ) {
        
        case FETCH_TEAMS:
            invokeListContainers( store, provider )
                .then( data => fetchTeamsData( data ) )
                .catch( err => fetchTeamsError( err ) )
                .then( next );

    }

};

export default listTeams;