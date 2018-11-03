import { CREATE, createSucceeded, CREATE_SUCCEEDED, createFailed, CREATE_FAILED } from "../actions/team";
import { fetchTeams, FETCH_TEAMS_DATA, FETCH_TEAMS_ERROR, SELECT_TEAM } from "../actions/teams";
import { addContainer } from "../logic/storage";
import { selectTeam } from "../actions/teams";
import { nav, expand } from "../components/routing";
import { PROGRESS } from "../components/routes";
import { enqueue } from "../actions/queues";

const afterCreate = id => [ 
                    
    { 
        after: CREATE_SUCCEEDED,
        then: () => fetchTeams(),
        abortOn: CREATE_FAILED
    },
    {
        after: FETCH_TEAMS_DATA,
        then: () => selectTeam( id ),
        abortOn: FETCH_TEAMS_ERROR
    },
    {
        after: SELECT_TEAM,
        then: () => nav( expand( PROGRESS, { teamid: id } ), "Team progress" )
    }

];

const createTeam = store => next => action => {

    const { type } = action;
    next( action );
    if ( type === CREATE ) {

        const { storage, createTeam } = store.getState();
        const { context } = storage || {};
        const { connected } = context || {};
        const { provider, current } = connected || {};
        const { name, logo, id } = createTeam || {};
        new Promise( async ( resolve, reject ) => {

            try {

                // create a new team file
                if ( !connected ) throw new Error( "No active data connection was found" );
                if ( !provider ) throw new Error( "The active connection doesn't contain a provider" );
                if ( !current ) throw new Error( "The active connection doesn't ");
                if ( !name ) throw new Error( "Please specify a name for your team" );
                
                // update index with a reference to the team file
                await addContainer( connected, provider, { type: "team", id, name, logo } );
                provider.refresh( connected );
                next( enqueue( afterCreate( id ) ) );
                next( createSucceeded() );
                
            } catch( ex ) {
                
                reject( ex );
                
            }
            
        } ).catch( err => 
        
            next( createFailed( err ) 
        
        ) );

    }

};

export default createTeam;