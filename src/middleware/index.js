import createTeam from "./create-team";
import listTeams from "./list-teams";
import tempProvider from "./temp-provider";
import validateStorage from "./validate-storage";
import loadTeamDetails from "./load-team-details";
import saveTeamDetails from "./save-team-details";
import saveScores from "./save-scores";
import loadScores from "./load-scores";
import loadMetrics from "./load-metrics";
import goals from "./goals";
import errors from "./errors";
import saveTeam from "./save-team";
import queuing from "./queuing";

export default [ 
    
    tempProvider, // send in a provider to all other middleware
    validateStorage,
    listTeams, createTeam, saveTeam, saveTeamDetails, saveScores, loadScores, goals, loadTeamDetails, loadMetrics,
    queuing, // queued updates
    errors  // catch any error messages
    
];
