export const ns =           "/src/actions/metrics";
export const LOAD =         `${ns}.LOAD`;
export const LOAD_DONE =    `${LOAD}.DONE`;
export const LOAD_ERROR =   `${LOAD}.ERROR`;

export const load =         when =>             ( { type: LOAD, payload: { when } } );
export const loadDone =     ( when, data ) => ( { type: LOAD_DONE, payload: { when, data } } );
export const loadError =    err =>              ( { type: LOAD_ERROR, payload: err } );
