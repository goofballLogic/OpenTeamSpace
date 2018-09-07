const APP_ID = "OpenTeamSpace for Developers";
const shortid = require( "shortid" );
const INDEX_FILENAME = "index.json";

export const isCurrentApplication = 
    ( { owner } ) => 
        owner === APP_ID;
    
export const fetchIndex = 
    async ( provider, folder ) => 
        await provider.downloadParsedJSON( folder, INDEX_FILENAME );

export const saveIndex = 
    async ( provider, folder, index ) =>
        await provider.uploadAsJSON( folder, INDEX_FILENAME, index );
    
const dateString = 
    ( date = new Date() ) =>
        date.toISOString();

export async function updateAccessRecord( provider, folder ) {
    
    const index = await fetchIndex( provider, folder );
    index.lastAccessed = dateString();
    await saveIndex( provider, folder, index );

}

export async function initializeFolder( provider, folder ) {
    
    const index = {
        
        owner: APP_ID,
        version: "0.1",
        created: dateString(),
        description: "This is the metadata file for the application",
        id: shortid()
    
    };
    await saveIndex( provider, folder, index );
    return index;
    
}

const buildContainerName = ( { type, name, id } ) => `${type}: ${name} (${id})`;

export async function addContainer( parent, provider, spec ) {
    
    if ( !parent ) throw new Error( "Argument not supplied: parent" );
    const { type, id } = spec;
    const folderName = buildContainerName( spec );
    await provider.createFolder( parent, folderName );
    const index = await provider.downloadParsedJSON( parent, INDEX_FILENAME );
    index.containers = index.containers || {};
    const typeIndex = index.containers[ type ] = index.containers[ type ] || {};
    typeIndex[ id ] = {
        
        created: dateString(),
        ...spec,
    
    };
    await provider.uploadAsJSON( parent, INDEX_FILENAME, index );

}

export async function fetchContainerIndex( parent, provider, spec ) {
    
    if ( !parent ) throw new Error( "Argument not supplied: parent" );
    const { type, id } = spec;
    const folderName = buildContainerName( spec );
    let folderSpec = parent.list.find( x => x.name === folderName );
    if ( !folderSpec ) {
        
        await addContainer( parent, provider, spec );
        await provider.refresh( parent );
        folderSpec = parent.list.find( x => x.name === folderName );

    }
    if ( !folderSpec ) {
        
        throw new Error( `Unable to find/read folder ${folderName}` );
        
    }
    const containerFolder = await parent.go( folderSpec );
    let index = await provider.downloadParsedJSON( containerFolder, INDEX_FILENAME );
    if ( !index ) {
    
        index = {};
        await provider.uploadAsJSON( containerFolder, INDEX_FILENAME, index );
        
    }
    return index;
    
}

export async function listContainers( parent, provider, type ) {
    
    if ( !parent ) throw new Error( "Argument not supplied: parent" );
    const index = await provider.downloadParsedJSON( parent, INDEX_FILENAME );
    const typeIndex = ( index.containers || {} )[ type ] || {};
    return Object.values( typeIndex );
    
}