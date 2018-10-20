import {
    FETCH_TEAMS, FETCH_TEAMS_DATA, FETCH_TEAMS_ERROR, 
    SELECT_TEAM, 
    FETCH_TEAM_DETAILS, FETCH_TEAM_DETAILS_DATA, FETCH_TEAM_DETAILS_ERROR,
    UPDATE_TEAM_PROFILES,
    SAVE_TEAM_DETAILS, SAVE_TEAM_DETAILS_DONE, SAVE_TEAM_DETAILS_ERROR
} from "../actions/teams";
import { 
    CREATE
} from "../actions/team";
import {
    RESET_CONTEXT
} from "../actions/storage";
export default function( state = {}, action ) {
    
    const { type, payload } = action;
    switch( type ) {
        
        case CREATE:
            return {
                
                ...state,
                teams: undefined
                
            };
        
        case FETCH_TEAMS:
            return {
                
                ...state,
                loading: true
                
            };
        
        case FETCH_TEAMS_DATA:
            const previouslySelected = state.selected;
            const selected = previouslySelected && payload.data.find( team => team.id === previouslySelected.id );
            return {
                
                ...state,
                loading: false,
                err: undefined,
                teams: payload.data,
                selected
                
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
                selected: { ...state.selected, loading: false, details: payload.data, err: undefined }
                
            };
        case FETCH_TEAM_DETAILS_ERROR:
            if ( !state.selected ) return state;
            return {
                
                ...state,
                selected: { ...state.selected, loading: false, err: payload }
                
            };
        case UPDATE_TEAM_PROFILES:
            return {
                
                ...state,
                selected: { 
                    
                    ...state.selected, 
                    dirty: true, 
                    details: { ...state.selected.details, profiles: payload.profiles }
                    
                }
                
            };
        case SAVE_TEAM_DETAILS:
            if ( !state.selected ) return state;
            return {
                
                ...state,
                selected: { ...state.selected, saving: true, err: undefined }
                
            };
        case SAVE_TEAM_DETAILS_DONE:
            if ( !state.selected ) return state;
            return {
                
                ...state,
                
                selected: { ...state.selected, saving: false, dirty: false }
                
            };
        case SAVE_TEAM_DETAILS_ERROR:
            if ( !state.selected ) return state;
            return {
                
                ...state,
                selected: { ...state.selected, saving: false, err: payload }
                
            }; 
        default:
            return state;
            
    }

}