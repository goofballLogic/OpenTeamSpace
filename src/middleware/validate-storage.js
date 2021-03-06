import { CHANGE_CONTEXT, observeContextChanges } from "../actions/storage";

const validateStorage = store => next => action => {

    const { type } = action;
    if ( type !== CHANGE_CONTEXT ) return next( action );
    const before = store.getState();
    const result = next( action );
    const after = store.getState();
    store.dispatch( observeContextChanges( before.storage.context, after.storage.context ) );
    return result;

};
export default validateStorage;