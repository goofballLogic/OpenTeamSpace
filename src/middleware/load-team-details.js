import { FETCH_TEAM_DETAILS, fetchTeamDetailsData, fetchTeamDetailsError } from "../actions/teams";
import { listContainers, fetchContainerIndex } from "../logic/storage";

async function invokeFetchTeamDetails( store, provider ) {

    if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );

    const { storage, teams } = store.getState();
    
    const { context } = storage || {};
    const { connected } = context || {};
    if ( !connected ) throw new Error( "No active data connection was found" );
    
    const { selected } = teams || {};
    if ( !selected ) throw new Error( "No team selected" );

    const spec = ( await listContainers( connected, provider, "team" ) ).find( spec => spec.id === selected.id );
    const index = await fetchContainerIndex( connected, provider, spec );
    return index.team;
    
}

const listTeams = store => next => action => {

    const { type, provider } = action;
    next( action );
    if ( type === FETCH_TEAM_DETAILS ) {
        
        invokeFetchTeamDetails( store, provider )
            .then( data => fetchTeamDetailsData( { data } ) )
            .catch( err => console.error( err ) || fetchTeamDetailsError( err ) )
            .then( next );

    }

};

export default listTeams;