export const POPULATE = "./src/actions/team.POPULATE";
export const CREATE = "./src/actions/team.CREATE";
export const CREATE_SUCCEEDED = "./src/actions/team.CREATE.SUCCEEDED";
export const CREATE_FAILED = "./src/actions/team.CREATE.ERROR";
export const SAVE = "./src/actions/team.SAVE";
export const SAVE_SUCCEEDED = "./src/actions/team.SAVE.SUCCEEDED";
export const SAVE_FAILED = "./src/actions/team.SAVE.ERROR";

export const populate = props => ( { type: POPULATE, payload: { ...props } } );

export const createSucceeded = () => ( { type: CREATE_SUCCEEDED } );

export const createFailed = err => ( { type: CREATE_FAILED, payload: { err } } );

export const create = () => ( { type: CREATE } );

export const save = props => ( { type: SAVE, payload: { ...props } } );

export const saveSucceeded = () => ( { type: SAVE_SUCCEEDED } );

export const saveFailed = err => ( { type: SAVE_FAILED, payload: { err } } );