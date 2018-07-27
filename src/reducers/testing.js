import { UPDATE_TEAM_DETAILS } from "../actions/testing";

const defaultShape = {
    
    team: {
        
        logo: "",
        name: "",
        profiles: []
        
    },
    size: 3
    
};
export default function( state = defaultShape, action ) {
    
    const { type, payload } = action;
    switch( type ) {
        
        case UPDATE_TEAM_DETAILS:
            return { ...state, team: {
                
                ...state.team,
                ...payload.details
                
            } };

        default:
            return state;

    }

}