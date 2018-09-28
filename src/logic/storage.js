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

const buildIndex = description => ( {
        
    owner: APP_ID,
    version: "0.1",
    created: dateString(),
    description,
    id: shortid()
    
} );

export async function initializeFolder( provider, folder ) {
    
    const index = buildIndex( "This is the metadata file for the application" );
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

export async function ensureContainerFolder( parent, provider, spec ) {
    
    if ( !parent ) throw new Error( "Argument not supplied: parent" );
    if ( !spec ) throw new Error( "Argument not supplied: spec" );
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
    return await parent.go( folderSpec );
    
}

async function ensureIndex( folder, provider, description ) {
    
    return ensureFile( folder, provider, INDEX_FILENAME, () => buildIndex( description ) );

}

async function ensureFile( folder, provider, filename, buildDefaultValue ) {
    
    let existing = await provider.downloadParsedJSON( folder, filename );
    if ( !existing ) {
        
        existing = buildDefaultValue();
        await provider.uploadAsJSON( folder, filename, existing );
        
    }
    return existing;
    
}

export async function fetchContainerIndex( parent, provider, spec ) {
    
    const containerFolder = await ensureContainerFolder( parent, provider, spec );
    return ensureIndex( containerFolder, provider );
    
}

export async function patchContainerIndex( parent, provider, spec, props ) {
    
    return patchFile( parent, provider, spec, INDEX_FILENAME, props, () => buildIndex( "Container for " + spec.type ) );
    // const containerFolder = await ensureContainerFolder( parent, provider, spec );
    // const existingProps = await ensureFile( containerFolder, provider, INDEX_FILENAME,  );
    // const index = { ...existingProps, ...props };
    // await provider.uploadAsJSON( containerFolder, INDEX_FILENAME, index );
    // return index;
    
}

export async function loadFile( parent, provider, spec, filename ) {
    
    const containerFolder = await ensureContainerFolder( parent, provider, spec );
    return await provider.downloadParsedJSON( containerFolder, filename );
    
}
export async function patchFile( parent, provider, spec, filename, props, emptyFileBuilder = () => ({}) ) {
    
    const containerFolder = await ensureContainerFolder( parent, provider, spec );
    const existing = await ensureFile( containerFolder, provider, filename, emptyFileBuilder );
    const patched = { ...existing, ...props };
    await provider.uploadAsJSON( containerFolder, filename, patched );
    return patched;
    
}

export async function uploadContainerItem( parent, provider, spec, filename, data ) {
    
    const containerFolder = await ensureContainerFolder( parent, provider, spec );
    await provider.uploadAsJSON( containerFolder, filename, data );
    
}

export async function listContainers( parent, provider, type ) {
    
    if ( !parent ) throw new Error( "Argument not supplied: parent" );
    const index = await provider.downloadParsedJSON( parent, INDEX_FILENAME );
    const typeIndex = ( index.containers || {} )[ type ] || {};
    return Object.values( typeIndex );
    
}