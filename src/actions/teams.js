export const FETCH_TEAMS = "src/actions.teams.FETCH_TEAMS";
export const FETCH_TEAMS_DATA = "src/actions.teams.FETCH_TEAMS.DATA";
export const FETCH_TEAMS_ERROR = "src/actions.teams.FETCH_TEAMS.ERROR";
export const SELECT_TEAM = "src/actions.teams.SELECT_TEAM";

export const fetchTeamsError = err => ( { type: FETCH_TEAMS_ERROR, payload: err } );

export const fetchTeams = () => ( { type: FETCH_TEAMS } );

export const fetchTeamsData = data => ( { type: FETCH_TEAMS_DATA, payload: { data } } );

export const selectTeam = id => ( { type: SELECT_TEAM, payload: { id } } );