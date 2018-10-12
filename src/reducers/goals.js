import { 
    SAVE_GOAL,
    SAVE_ALL_GOALS, SAVE_ALL_GOALS_DONE, SAVE_ALL_GOALS_ERROR,
    FETCH_TEAM_GOALS, FETCH_TEAM_GOALS_DONE, FETCH_TEAM_GOALS_ERROR
} from "../actions/goals";
import {
    
    SELECT_TEAM
    
} from "../actions/teams";
const defaultGoals = {
    
    items: [],
    originalItems: [],
    loaded: false
    
};

function isDirty( state ) {

    if ( !state.items && state.originalItems ) return true;
    if ( state.items && !state.originalItems ) return true;
    return JSON.stringify( state.items ) !== JSON.stringify( state.originalItems );
    
}

function includingItem( items = [], item ) {
    
    items = items.map( x => x.id === item.id ? item : x );
    return items.includes( item ) ? items : [ ...items, item ];
    
}

function resettingDirtiness( state ) {
    
    return {
        
        ...state,
        originalItems: state.items ? JSON.parse( JSON.stringify( state.items ) ) : state.items
        
    };
        
}

function wrapped( state, action ) {
    
    const { type, payload } = action;
    switch( type ) {
        
        case SELECT_TEAM:
            return defaultGoals;
        case SAVE_GOAL:
            return {
                
                ...state,
                items: includingItem( state.items, payload.item )
                
            };
        case SAVE_ALL_GOALS:
            return {
                
                ...state,
                loading: true
                
            };
        case SAVE_ALL_GOALS_DONE:
            return state.loading ? resettingDirtiness( {
                
                ...state,
                loading: false
                
            } ) : state;
        case SAVE_ALL_GOALS_ERROR:
            return state.loading ? {
                
                ...state,
                loading: false,
                err: payload
                
            } : state;
        case FETCH_TEAM_GOALS:
            return {
                
                ...defaultGoals,
                loading: true,
                loaded: false
                
            };
        case FETCH_TEAM_GOALS_DONE:
            return state.loading ? resettingDirtiness( {
                
                ...state,
                items: payload.items,
                loading: false,
                loaded: true
                
            } ) : state;
        case FETCH_TEAM_GOALS_ERROR:
            return state.loading ? {
                
                ...state,
                loading: false,
                err: payload
                
            } : state;
        default:
            return state;
            
    }
    
}

export default function( state = defaultGoals, action ) {
    
    const newState = wrapped( state, action );
    const dirtiness = isDirty( newState );
    return dirtiness === newState.isDirty
        ? newState
        : { ...newState, isDirty: dirtiness };

}