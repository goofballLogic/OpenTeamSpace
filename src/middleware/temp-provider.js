
const temporaryAttachProvider = store => next => action => {

    const { storage } = store.getState();
    return next( {
        
        ...action,
        provider: storage && storage.context && storage.context.provider
        
    } );

};
export default temporaryAttachProvider;
