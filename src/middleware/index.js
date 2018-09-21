import createTeam from "./create-team";
import listTeams from "./list-teams";
import tempProvider from "./temp-provider";
import validateStorage from "./validate-storage";
import loadTeamDetails from "./load-team-details";
import saveTeamDetails from "./save-team-details";
import saveScores from "./save-scores";
import loadScores from "./load-scores";
import goals from "./goals";
import errors from "./errors";

export default [ 
    
    tempProvider, // send in a provider to all other middleware
    validateStorage,
    listTeams, createTeam, loadTeamDetails, saveTeamDetails, saveScores, loadScores, goals, // normal middleware
    errors  // catch any error messages

];
