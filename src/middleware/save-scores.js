import { SAVE, saveDone, saveError } from "../actions/record";
import { listContainers, patchFile } from "../logic/storage";

async function updateScores( store, provider ) {

    if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );
    const { storage, teams, record } = store.getState();

    const { context } = storage || {};
    const { connected } = context || {};
    if ( !connected ) throw new Error( "No active data connection was found" );

    const { selected } = teams || {};
    if ( !selected ) throw new Error( "No team selected" );

    const { current } = record;
    if ( !current ) throw new Error( "No scores to save" );
    
    const filename = `${current.when.substring( 0, 4 )}.json`;
    const payload = { [ current.when ]: current.scores };
    const folders = await listContainers( connected, provider, "team" );
    const teamFolderSpec = folders.find( spec => spec.id === selected.id );
    patchFile( connected, provider, teamFolderSpec, filename, payload );

}

const listTeams = store => next => action => {

    const { type, payload, provider } = action;
    next( action );
    if ( type === SAVE ) {
        
        updateScores( store, provider )
            .then( () => saveDone( payload ) )
            .catch( err => saveError( err ) )
            .then( next );

    }

};

export default listTeams;