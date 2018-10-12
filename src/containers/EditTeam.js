import React, { Component } from "react";
import { connect } from "react-redux";
import { save } from "../actions/team";
import EditTeam from "../components/nodes/EditTeam";
import { fetchTeamDetails } from "../actions/teams";

class EditTeamContainer extends Component {
    
    ensureTeamDetails() {
    
        const { 
            
            selectedFolder, selected,
            teamDetailsErr, isLoading, isLoaded, 
            dispatchFetchTeamDetails
            
        } = this.props;
        if ( teamDetailsErr || isLoaded || isLoading ) return;
        dispatchFetchTeamDetails( selected, selectedFolder );
        
    }

    componentDidMount() {
        
        this.ensureTeamDetails();
        
    }
    
    componentDidUpdate() {
        
        this.ensureTeamDetails();
        
    }
    
    render() {
        
        return <EditTeam {...this.props} />;

    }
    
}

const mapStateToProps = ( { teams } ) => ( { 
    
    ...teams.selected,
    isLoading: teams.selected && teams.selected.loading,
    isLoaded: teams.selected && !teams.selected.loading,
    isSaving: teams.selected && teams.selected.saving
    
} );
const mapDispatchToProps = ( dispatch, { nav } ) => ( {
    
    save: props => dispatch( save( props ) ),
    dispatchFetchTeamDetails: ( selected, selectedFolder ) => dispatch( fetchTeamDetails( selected, selectedFolder ) )
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( EditTeamContainer );