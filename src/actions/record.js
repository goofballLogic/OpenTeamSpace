export const ns =           "/src/actions/record";
export const SAVE =         `${ns}.SAVE`;
export const SAVE_DONE =    `${SAVE}.DONE`;
export const SAVE_ERROR =   `${SAVE}.ERROR`;
export const LOAD =         `${ns}.LOAD`;
export const LOAD_DONE =    `${LOAD}.DONE`;
export const LOAD_ERROR =   `${LOAD}.ERROR`;

export const save =         current =>          ( { type: SAVE, payload: current } );
export const saveDone =     current =>          ( { type: SAVE_DONE, payload: current } );
export const saveError =    err =>              ( { type: SAVE_ERROR, payload: err } );
export const load =         when =>             ( { type: LOAD, payload: { when } } );
export const loadDone =     ( when, scores ) => ( { type: LOAD_DONE, payload: { when, scores } } );
export const loadError =    err =>              ( { type: LOAD_ERROR, payload: err } );