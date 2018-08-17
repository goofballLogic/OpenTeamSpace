const APP_ID = "OpenTeamSpace for Developers";

export const isCurrentApplication = 
    ( { owner } ) => 
        owner === APP_ID;
    
export const fetchIndex = 
    async ( provider, folder ) => 
        await provider.downloadParsedJSON( folder, "index.json" );

export const saveIndex = 
    async ( provider, folder, index ) =>
        await provider.uploadAsJSON( folder, "index.json", index );
    
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
        description: "This is the metadata file for the application"
    
    };
    await saveIndex( provider, folder, index );
    return index;
    
}