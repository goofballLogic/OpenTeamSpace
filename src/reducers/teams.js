import { 
    FETCH_TEAMS, FETCH_TEAMS_DATA, FETCH_TEAMS_ERROR, 
    SELECT_TEAM, 
    FETCH_TEAM_DETAILS, FETCH_TEAM_DETAILS_DATA, FETCH_TEAM_DETAILS_ERROR 
} from "../actions/teams";
import { RESET_CONTEXT } from "../actions/storage";

export default function( state = {}, action ) {
    
    const { type, payload } = action;
    switch( type ) {
        
        case FETCH_TEAMS:
            return {
                
                ...state,
                loading: true
                
            };
        
        case FETCH_TEAMS_DATA:
            return {
                
                ...state,
                loading: false,
                err: undefined,
                teams: payload.data
                
            };
            
        case FETCH_TEAMS_ERROR:
            return {
                
                ...state,
                loading: false,
                err: payload
                
            };
        case SELECT_TEAM:
            return {
                
                ...state,
                selected: state.teams.find( x => x.id === payload.id )
                
            };
        case RESET_CONTEXT:
            return {};
        case FETCH_TEAM_DETAILS:
            if ( !state.selected ) return state;
            return {
                
                ...state,
                selected: { ...state.selected, loading: true, details: undefined }
                
            };
        case FETCH_TEAM_DETAILS_DATA:
            if ( !state.selected ) return state;
            return {
                
                ...state,
                selected: { ...state.selected, loading: false, details: payload.data }
                
            };
        default:
            return state;
            
    }

}