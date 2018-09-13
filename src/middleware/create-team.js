import { CREATE, createSucceeded, createFailed } from "../actions/create-team";
import { addContainer } from "../logic/storage";

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