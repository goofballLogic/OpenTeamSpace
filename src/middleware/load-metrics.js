import { LOAD, loadDone, loadError } from "../actions/metrics";
import { listContainers, ensureContainerFolder } from "../logic/storage";

async function loadDataFiles( parent, provider, folderSpec, fileFilter ) {
    
    const teamFolder = await ensureContainerFolder( parent, provider, folderSpec );
    const teamFolderFiles = await provider.listFiles( teamFolder );
    const teamYearFiles = teamFolderFiles.filter( fileFilter );
    const loadingDataFiles = teamYearFiles.map( file => provider.downloadParsedJSON( teamFolder, file.name ) );
    return await Promise.all( loadingDataFiles );
    
}

async function loadMetrics( when, store, provider ) {

    if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );
    const { storage, teams } = store.getState();

    const { context } = storage || {};
    const { connected } = context || {};
    if ( !connected ) throw new Error( "No active data connection was found" );

    const { selected } = teams || {};
    if ( !selected ) throw new Error( "No team selected" );
    
    const folders = await listContainers( connected, provider, "team" );
    const teamFolderSpec = folders.find( spec => spec.id === selected.id );
    if ( !teamFolderSpec ) throw new Error( "Can't find current team in the selected storage folder" );
    
    const fileFilter = file => file.mimeType === "application/json" && /^\d{4}\.json/.test( file.name );
    const dataFiles = await loadDataFiles( connected, provider, teamFolderSpec, fileFilter );
    
    const data = dataFiles.reduce( ( all, year ) => ( { ...all, ...year } ), {} );
    return {
        
        when,
        data
        
    };
    
}

const listTeams = store => next => action => {

    const { type, payload, provider } = action;
    next( action );
    if ( type === LOAD ) {
        
        loadMetrics( payload.when, store, provider )
            .then( ( { when, data } ) => loadDone( when, data ) )
            .catch( err => loadError( err ) )
            .then( next );

    }

};

export default listTeams;