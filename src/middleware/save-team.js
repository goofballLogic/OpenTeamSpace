import { SAVE, saveSucceeded, saveFailed } from "../actions/team";
import { fetchIndex, saveIndex } from "../logic/storage";
import { fetchTeams } from "../actions/teams";

async function save( store, props = {} ) {
    
    const { id, name, logo } = props;
    if ( !name ) throw new Error( "Please specify a name for your team" );
    
    const { storage, teams } = store.getState();
    const { context } = storage;
    const { connected } = context || {};
    if ( !connected ) throw new Error( "No active data connection was found" );
    const { provider } = connected || {};
    if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );
    const { selected } = teams;
    if ( !selected ) throw new Error( "No current team selected" );
    const index = await fetchIndex( provider, connected );
    const { containers = {} } = index;
    const found = containers.team[ id ];
    if ( !found ) throw new Error( "No team entry found" );
    const updated = { ...found, name, logo };
    containers.team[ id ] = updated;
    await saveIndex( provider, connected, index );
    store.dispatch( fetchTeams() );
    
}

const saveTeam = store => next => action => {

    const { type, payload } = action;
    next( action );
    if ( type === SAVE ) {

        save( store, payload ).then( 
            
            () => next( saveSucceeded() ),
            err => next( saveFailed( err ) )
            
        );

    }

};

export default saveTeam;