import React, { Component } from "react";
import Users from "../components/nodes/Users";
import { connect } from "react-redux";
import { fetchTeamDetails, updateTeamProfiles, saveTeamDetails } from "../actions/teams";

class UsersContainer extends Component {
    
    ensureDetails() {
    
        const { selectedFolder, selected, isLoaded, loading, dispatchFetchTeamDetails } = this.props;
        if ( !( isLoaded || loading ) ) dispatchFetchTeamDetails( selected, selectedFolder );
        
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

const sortByName =

    profiles =>
    
        [ ...profiles ].sort( ( x, y ) => x.name > y.name ? 1 : x.name < y.name ? -1 : 0 );
        
const buildEditable = 

    teams => 

        teams && teams.selected && teams.selected.details && { 
            
            size: 8, 
            team: {
                
                profiles: sortByName( teams.selected.details.profiles || [] )
                
            }
            
        };
        
const mapStateToProps = ( { teams, storage } ) => ( { 
    
    selected: teams.selected,
    isLoaded: teams.selected && teams.selected.details,
    isDirty: teams.selected && teams.selected.dirty,
    editable: buildEditable( teams ),
    loading: teams.selected && teams.selected.loading,
    selectedFolder: storage.context && storage.context.selectedFolder
    
} );

const mapDispatchToProps = ( dispatch ) => ( {

    dispatchFetchTeamDetails: ( selected, selectedFolder ) => dispatch( fetchTeamDetails( selected, selectedFolder ) ),
    handleChange: ( { profiles } ) => dispatch( updateTeamProfiles( profiles ) ),
    handleSave: e => { e.preventDefault(); dispatch( saveTeamDetails() ); },
    handleArchive: ( profile, editable ) => {
     
        if ( window.confirm( "Are you sure you want to archive this profile?" ) ) {
            
            dispatch( updateTeamProfiles( editable.team.profiles.filter( x => x.id !== profile.id ) ) );
            
        }
        
    }
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( UsersContainer );