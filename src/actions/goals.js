const ns = "src/actions/goals";

export const SAVE_GOAL = `${ns}.SAVE_GOAL`;
export const SAVE_ALL_GOALS = `${ns}.SAVE_ALL_GOALS`;
export const SAVE_ALL_GOALS_DONE = `${SAVE_ALL_GOALS}.DONE`;
export const SAVE_ALL_GOALS_ERROR = `${SAVE_ALL_GOALS}.ERROR`;
export const FETCH_TEAM_GOALS = `${ns}.FETCH_TEAM_GOALS`;
export const FETCH_TEAM_GOALS_DONE = `${FETCH_TEAM_GOALS}.DONE`;
export const FETCH_TEAM_GOALS_ERROR = `${FETCH_TEAM_GOALS}.ERROR`;

export const saveGoal = 
    item => 
        ( { type: SAVE_GOAL, payload: { item } } );
export const saveAllGoals = 
    () => 
        ( { type: SAVE_ALL_GOALS } );
export const saveAllGoalsDone = 
    () => 
        ( { type: SAVE_ALL_GOALS_DONE } );
export const saveAllGoalsError = 
    err => 
        ( { type: SAVE_ALL_GOALS_ERROR, payload: err } );
export const fetchTeamGoals = 
    ( selected, selectedFolder ) => 
        ( { type: FETCH_TEAM_GOALS, payload: { selected, selectedFolder } } );
export const fetchTeamGoalsDone = 
    data => 
        ( { type: FETCH_TEAM_GOALS_DONE, payload: data } );
export const fetchTeamGoalsError = 
    err => 
        ( { type: FETCH_TEAM_GOALS_ERROR, payload: err } );