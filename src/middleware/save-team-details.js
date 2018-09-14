import { SAVE_TEAM_DETAILS, saveTeamDetailsDone, saveTeamDetailsError } from "../actions/teams";
import { listContainers, patchContainerIndex } from "../logic/storage";

async function findAndSaveTeamIndex( store, provider ) {

    if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );
    const { storage, teams } = store.getState();

    const { context } = storage || {};
    const { connected } = context || {};
    if ( !connected ) throw new Error( "No active data connection was found" );

    const { selected } = teams || {};
    if ( !selected ) throw new Error( "No team selected" );

    if ( selected.dirty && selected.details ) {

        const folders = await listContainers( connected, provider, "team" );
        const teamFolderSpec = folders.find( spec => spec.id === selected.id );
        await patchContainerIndex( connected, provider, teamFolderSpec, selected.details );

    }
    
}

const listTeams = store => next => action => {

    const { type, provider } = action;
    next( action );
    if ( type === SAVE_TEAM_DETAILS ) {
        
        findAndSaveTeamIndex( store, provider )
            .then( () => saveTeamDetailsDone() )
            .catch( err => console.error( err ) || saveTeamDetailsError( err ) )
            .then( next );

    }

};

export default listTeams;