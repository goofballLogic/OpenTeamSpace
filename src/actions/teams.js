export const FETCH_TEAMS = "src/actions.teams.FETCH_TEAMS";
export const FETCH_TEAMS_DATA = `${FETCH_TEAMS}.DATA`;
export const FETCH_TEAMS_ERROR = `${FETCH_TEAMS}.ERROR`;
export const SELECT_TEAM = "src/actions.teams.SELECT_TEAM";
export const FETCH_TEAM_DETAILS = "src/actions.teams.FETCH_TEAM_DETAILS";
export const FETCH_TEAM_DETAILS_DATA = `${FETCH_TEAM_DETAILS}.DATA`;
export const FETCH_TEAM_DETAILS_ERROR = `${FETCH_TEAM_DETAILS}.ERROR`;

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