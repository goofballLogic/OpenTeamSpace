import { toast } from "react-toastify";

const errors = store => next => action => {

    if ( /\.ERROR$/.test( action.type ) ) {
    
        const message = action.payload 
            ? action.payload.message || action.payload 
            : "Unknown";
        console.error( action );
        toast( `An error occurred: ${message}` );
    
    }
    return next( action );

};
export default errors;
