export const POPULATE = "./src/actions/create-team.POPULATE";
export const CREATE = "./src/actions/create-team.CREATE";
export const CREATE_SUCCEEDED = "./src/actions/create-team.CREATE_SUCCEED";
export const CREATE_FAILED = "./src/actions/create-team.CREATE_FAILED";

export const populate = props => ( {
        
    type: POPULATE,
    payload: { ...props }
        
} );

export const createSucceeded = () => ( { type: CREATE_SUCCEEDED } );

export const createFailed = err => ( { type: CREATE_FAILED, payload: { err } } );

export const create = () => ( { type: CREATE } );


        