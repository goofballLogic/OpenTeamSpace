import { CHANGE_CONTEXT, observeSelectedFolder } from "../actions/storage";

const validateStorage = store => next => action => {

    const { type } = action;
    if ( type !== CHANGE_CONTEXT ) return next( action );
    const before = store.getState();
    const result = next( action );
    const after = store.getState();
    store.dispatch( observeSelectedFolder( before.storage.context, after.storage.context ) );
    return result;

};
export default validateStorage;