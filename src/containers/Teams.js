import React, { Component } from "react";
import { connect } from "react-redux";
import Teams from "../components/nodes/Teams";
import { fetchTeams, selectTeam } from "../actions/teams";

class TeamsContainer extends Component {
    
    ensureListing() {
    
        const { teams, loading, fetchTeams: dispatchFetchTeams, selectedFolder } = this.props;
        if ( !( teams || loading ) ) dispatchFetchTeams( selectedFolder );
        
    }
    
    componentDidMount() {
        
        this.ensureListing();
        
    }
    
    componentDidUpdate() {
        
        this.ensureListing();
        
    }
    
    render() {
        
        return <Teams {...this.props} />;
        
    }
    
}

const mapStateToProps = ( { teams, storage } ) => ( { 
    
    ...teams,
    unselected: teams.teams && teams.teams.filter( x => x.id !== ( teams.selected || {} ).id ),
    selectedFolder: storage.context && storage.context.selectedFolder
    
} );

const mapDispatchToProps = ( dispatch, { nav } ) => ( {
    
    fetchTeams: selectedFolder => selectedFolder && dispatch( fetchTeams( selectedFolder ) ),
    selectTeam: id => dispatch( selectTeam( id ) )
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( TeamsContainer );

if ( module.hot ) module.hot.accept();