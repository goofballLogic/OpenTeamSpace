const ns = "src/actions.teams";
export const FETCH_TEAMS =                  `${ns}.FETCH_TEAMS`;
export const FETCH_TEAMS_DATA =             `${FETCH_TEAMS}.DATA`;
export const FETCH_TEAMS_ERROR =            `${FETCH_TEAMS}.ERROR`;
export const SELECT_TEAM =                  `${ns}.SELECT_TEAM`;
export const FETCH_TEAM_DETAILS =           `${ns}.FETCH_TEAM_DETAILS`;
export const FETCH_TEAM_DETAILS_DATA =      `${FETCH_TEAM_DETAILS}.DATA`;
export const FETCH_TEAM_DETAILS_ERROR =     `${FETCH_TEAM_DETAILS}.ERROR`;
export const UPDATE_TEAM_PROFILES =         `${ns}.UPDATE_TEAM_PROFILES`;
export const SAVE_TEAM_DETAILS =           `${ns}.SAVE_TEAM_DETAILS`;
export const SAVE_TEAM_DETAILS_DONE =      `${SAVE_TEAM_DETAILS}.DONE`;
export const SAVE_TEAM_DETAILS_ERROR =     `${SAVE_TEAM_DETAILS}.ERROR`;

export const fetchTeamsError = err => ( { type: FETCH_TEAMS_ERROR, payload: err } );

export const fetchTeams = () => ( { type: FETCH_TEAMS } );

export const fetchTeamsData = data => ( { type: FETCH_TEAMS_DATA, payload: { data } } );

export const selectTeam = id => ( { type: SELECT_TEAM, payload: { id } } );

export const fetchTeamDetails = ( selected, selectedFolder ) => ( {
    
    type: FETCH_TEAM_DETAILS,
    payload: { selected, selectedFolder }
    
} );

export const fetchTeamDetailsData = data => ( { type: FETCH_TEAM_DETAILS_DATA, payload: { data } } );

export const fetchTeamDetailsError = err => ( { type: FETCH_TEAM_DETAILS_ERROR, payload: { ...err, message: err.message, stack: err.stack } } );

export const updateTeamProfiles = profiles => ( { type: UPDATE_TEAM_PROFILES, payload: { profiles } } );

export const saveTeamDetails = () => ( { type: SAVE_TEAM_DETAILS } );

export const saveTeamDetailsDone = () => ( { type: SAVE_TEAM_DETAILS_DONE } );

export const saveTeamDetailsError = err => ( { type: SAVE_TEAM_DETAILS_ERROR, payload: { ...err, message: err.message, stack: err.stack } } );