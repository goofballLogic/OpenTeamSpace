import { 
    SAVE_ALL_GOALS, saveAllGoalsDone, saveAllGoalsError,
    FETCH_TEAM_GOALS, fetchTeamGoalsDone, fetchTeamGoalsError
} from "../actions/goals";
import { listContainers, patchContainerIndex, fetchContainerIndex } from "../logic/storage";
import {
    fetchTeamDetails
} from "../actions/teams";

async function saveGoals( store, provider ) {
    
    if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );
    const { storage, teams, goals } = store.getState();

    const { context } = storage || {};
    const { connected } = context || {};
    if ( !connected ) throw new Error( "No active data connection was found" );

    const { selected } = teams || {};
    if ( !selected ) throw new Error( "No team selected" );

    const folders = await listContainers( connected, provider, "team" );
    const teamFolderSpec = folders.find( spec => spec.id === selected.id );
    if ( !teamFolderSpec ) throw new Error( "Selected team can't be found in storage" );
    
    const { items } = goals;
    await patchContainerIndex( connected, provider, teamFolderSpec, { goals: items } );
    
}

async function loadGoals( store, provider ) {
    
    if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );
    const { storage, teams } = store.getState();

    const { context } = storage || {};
    const { connected } = context || {};
    if ( !connected ) throw new Error( "No active data connection was found" );

    const { selected } = teams || {};
    if ( !selected ) throw new Error( "No team selected" );

    const folders = await listContainers( connected, provider, "team" );
    const teamFolderSpec = folders.find( spec => spec.id === selected.id );
    if ( !teamFolderSpec ) throw new Error( "Selected team can't be found in storage" );
    
    const index = await fetchContainerIndex( connected, provider, teamFolderSpec );
    return { items: index.goals };
    
}

const goals = store => next => action => {
    
    const { type, provider } = action;
    const result = next( action );
    switch( type ) {
        
        case SAVE_ALL_GOALS:
            if ( store.getState().goals.loading ) {
                
                saveGoals( store, provider )
                    .then( saveAllGoalsDone )
                    .catch( err => saveAllGoalsError( err.stack ? err.stack : err ) )
                    .then( next )
                    .then( fetchTeamDetails )
                    .then( store.dispatch );
                    
            }
            break;
        case FETCH_TEAM_GOALS:
            if ( store.getState().goals.loading ) {
                
                loadGoals( store, provider )
                    .then( fetchTeamGoalsDone )
                    .catch( err => fetchTeamGoalsError( err.stack ? err.stack : err ) )
                    .then( next );
                    
            }
            break;
        default:
             // nada
             
    }
    return result;
    
};

export default goals;
