import { LOAD, loadDone, loadError } from "../actions/record";
import { listContainers, loadFile } from "../logic/storage";

async function loadScores( store, provider ) {

    if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );
    const { storage, teams, record } = store.getState();

    const { context } = storage || {};
    const { connected } = context || {};
    if ( !connected ) throw new Error( "No active data connection was found" );

    const { selected } = teams || {};
    if ( !selected ) throw new Error( "No team selected" );

console.log( "Record", record );
    const { current } = record;
    if ( !current ) throw new Error( "No scores to load" );
    
    const when = current.when;
    if ( !when ) throw new Error( "No date selected" );
    
    const filename = `${when.substring( 0, 4 )}.json`;
    
    const folders = await listContainers( connected, provider, "team" );
    const teamFolderSpec = folders.find( spec => spec.id === selected.id );
    
    const loaded = await loadFile( connected, provider, teamFolderSpec, filename );
console.log( loaded );
console.log( when );
    return { 
        
        when, 
        scores: ( loaded && loaded[ when ] ) || []
        
    };
}

const listTeams = store => next => action => {

    const { type, provider } = action;
    next( action );
    if ( type === LOAD ) {
        
        loadScores( store, provider )
            .then( ( { when, scores } ) => loadDone( when, scores ) )
            .catch( err => loadError( err ) )
            .then( next );

    }

};

export default listTeams;