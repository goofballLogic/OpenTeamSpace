import React, { Component } from "react";
import Goals from "../components/nodes/Goals";
import { connect } from "react-redux";
import shortid from "shortid";
import { saveGoal, saveAllGoals, fetchTeamGoals } from "../actions/goals";

class StatefulGoals extends Component {
    
    constructor() {
        
        super();
        this.state = { chosen: null };
        
    }
    
    ensureDetails() {
    
        const { selectedFolder, selected, isLoaded, isLoading, dispatchFetchTeamGoals } = this.props;
        if ( !( isLoaded || isLoading ) ) dispatchFetchTeamGoals( selected, selectedFolder );
        
    }
    
    componentDidMount() {
        
        this.ensureDetails();
        
    }
    
    componentDidUpdate() {
        
        this.ensureDetails();
        
    }
    
    handleChange( e, chosen ) {
        
        this.setState( { chosen: chosen ? JSON.parse( JSON.stringify( chosen ) ) : chosen } );
        
    }
    
    handleAdd( e ) {
        
        this.setState( { chosen: { id: shortid() } } );
        
    }
    
    handleSave( e, item ) {
        
        this.props.onSave( e, item );
        this.handleChange( e, undefined );
        
    }
    
    itemsWithChosen() {
        
        const { items } = this.props;
        const { chosen } = this.state;
        if ( !chosen ) return items;
        if ( items.find( x => x.id === chosen.id ) ) return items;
        return [ ...items, chosen ];
        
    }
    
    render() {
        
        return <Goals {...this.props}
            items={this.itemsWithChosen()}
            chosen={this.state.chosen}
            onSave={this.handleSave.bind( this )}
            onChange={this.handleChange.bind( this )}
            onAdd={this.handleAdd.bind( this )} />;
        
    }
    
}

const mapStateToProps = ( { goals } ) => ( { 
    
    items: goals.items || [],
    isDirty: goals.isDirty,
    isLoading: !!goals.loading,
    isLoaded: !!goals.loaded
    
} );

const mapDispatchToProps = ( dispatch ) => ( {
    
    onSave: ( e, item ) => dispatch( saveGoal( item ) ),
    onSaveAll: e => {
        
        e.preventDefault();
        dispatch( saveAllGoals() );
        
    },
    dispatchFetchTeamGoals: ( selected, selectedFolder ) => dispatch( fetchTeamGoals( selected, selectedFolder ) )
    
} );


export default connect( mapStateToProps, mapDispatchToProps )( StatefulGoals );