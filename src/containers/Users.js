import React, { Component } from "react";
import Users from "../components/nodes/Users";
import { connect } from "react-redux";
import { fetchTeamDetails } from "../actions/teams";

class UsersContainer extends Component {
    
    ensureDetails() {
    
        const { selectedFolder, selected, details, loading, dispatchFetchTeamDetails } = this.props;
console.log( this.props );
        if ( !( details || loading ) ) dispatchFetchTeamDetails( selected, selectedFolder );
        
    }
    
    componentDidMount() {
        
        this.ensureDetails();
        
    }
    
    componentDidUpdate() {
        
        this.ensureDetails();
        
    }
    
    render() {
        
        return <Users {...this.props} />;
        
    }
    
}

const mapStateToProps = ( { teams, storage } ) => ( { 
    
    selected: teams.selected,
    details: teams.selected && teams.selected.details,
    loading: teams.selected && teams.selected.loading,
    selectedFolder: storage.context && storage.context.selectedFolder
    
} );

const mapDispatchToProps = ( dispatch ) => ( {

    dispatchFetchTeamDetails: ( selected, selectedFolder ) => dispatch( fetchTeamDetails( selected, selectedFolder ) )
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( UsersContainer );