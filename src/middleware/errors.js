import { toast } from "react-toastify";

const errors = store => next => action => {

    const { type, payload } = action;
    if ( /\.ERROR$/.test( type ) ) {
    
        const err = payload && ( payload.err || payload );
        const message = err.message || err || "Unknown";
        console.error( action );
        toast( `An error occurred: ${message}` );
    
    }
    return next( action );

};
export default errors;
