import { ENQUEUE } from "../actions/queues";

const queue = [];
const queueEnd = Symbol();

const onAfterAction = ( store, action ) => {

    let head = queue[ 0 ];
    if ( !head ) return;
    const { type } = action;
    if ( head.after === type ) {
        
        head = queue.shift();
        const nextAction = head.then();
        if ( nextAction && nextAction.type ) {
    
            store.dispatch( nextAction );
            
        }
    
    }
    if ( head.abortOn === type ) {
        
        do {
         
            head = queue.shift();
            
        } while( head && head !== queueEnd );

    }
    while ( queue[ 0 ] === queueEnd ) {

        queue.shift();
        
    }

};

const queuing = store => next => action => {
    
    const { type, payload } = action;
    if ( type === ENQUEUE ) {
        
        for( const task of payload ) {
            
            queue.push( task );
            
        }
        queue.push( queueEnd );

    } 
    
    const result = next( action );
    setTimeout( () => onAfterAction( store, action ), 10 );
    return result;

};

export default queuing;