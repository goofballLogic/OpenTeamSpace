import React, { Component } from "react";
import Record from "../components/nodes/Record";
import { connect } from "react-redux";
import { fetchTeamDetails } from "../actions/teams";
import template from "../logic/goals-template";
import { load, save } from "../actions/record";
import { RECORD } from "../components/routes";

const buildTarget =

    props  =>
    
        ( { id: props.id, scores: [ { ...props } ] } );
        
class RecordContainer extends Component {
    
    constructor() {
        
        super();
        this.state={ working: {} };
        
    }
    
    ensureDetails() {
    
        const { 
            
            isTeamLoading, isTeamLoaded, team,
            isRecordLoading, isRecordLoaded, when,
            loadingError,
            dispatchFetchTeamDetails, dispatchLoadRecord
            
        } = this.props;
        if ( !( loadingError || isTeamLoading || isTeamLoaded ) ) {
            
            dispatchFetchTeamDetails( team );
            
        }
        if ( !( loadingError || isRecordLoading || isRecordLoaded ) ) {
            
            dispatchLoadRecord( when );
            
        }
        
    }
    
    componentDidMount() {
        
        this.ensureDetails();
        
    }
    
    componentDidUpdate() {
        
        this.ensureDetails();
        
    }
    
    patchWorking( props ) {
        
        const { working } = this.state;
        this.setState( {
            
            working: { ...working, ...props }
            
        } );
        
    }
    
    handleChangeDate( e ) {
        
        const { navigateToWhen } = this.props;
        navigateToWhen( e.target.value );

    }
    
    handleChangeGoal( e, goal ) {
        
        const { scores = [] } = this.props;
        this.patchWorking( { 
            
            goal,
            scoringTarget: buildTarget( goal ),
            selectedScores: scores
                .filter( score => score.goal === goal.id )
                .reduce( ( index, score ) => ( { ...index, [ score.uid ]: score.dir } ), {} )
            
        } );

    }
    
    handleChangeScores( selectedScores ) {
        
        this.patchWorking( { selectedScores } );
        
    }
    
    handleSaveScores() {
        
        const { dispatchSave, when } = this.props;
        
        const { working } = this.state;
        const { goal, selectedScores = {} } = working;
        if ( !goal ) return;
        
        const { id, upScore, downScore, goal: description } = goal;
        const data = Object.keys( selectedScores )
            .map( uid => [ uid, selectedScores[ uid ] ] )
            .filter( ( [ uid, dir ] ) => dir )
            .map( ( [ uid, dir ] ) => ( { 
                
                goal: id,
                description,
                uid, 
                dir, 
                diff: dir === "up" ? upScore : -1 * downScore 
                
            } ) );
            
        dispatchSave( when, data );
        this.setState

    }
    
    handleCancelScores() {
        
        this.setState( { working: {} } );
        
    }
    
    render() {
        
        return <Record {...this.props} 
            working={this.state.working}
            onChangeDate={this.handleChangeDate.bind( this )}
            onChangeGoal={this.handleChangeGoal.bind( this )}
            onChangeScores={this.handleChangeScores.bind( this )}
            onSaveScores={this.handleSaveScores.bind( this )}
            onCancelScores={this.handleCancelScores.bind( this )}
            template={template}
            />;
        
    }
    
}

const mapStateToProps = ( { teams = {}, goals = {}, storage = {}, record = {} }, { params } ) => ( { 
    
    team: teams.selected,
    loadingError: ( teams.selected && teams.selected.err ) || ( record.current && record.current.err ),
    isTeamLoading: teams.selected && teams.selected.loading,
    isTeamLoaded: !!( teams.selected && teams.selected.details ),
    isRecordLoading: record.current && record.current.loading,
    isRecordLoaded: !!( record.current && record.current.when === params[ 1 ] ),
    
    when: params && params[ 1 ],
    scores: record.current && record.current.scores,
    people: ( teams.selected && teams.selected.details && teams.selected.details.profiles ) || [],
    goals: ( teams.selected && teams.selected.details && teams.selected.details.goals ) || []
    
} );

const mapDispatchToProps = ( dispatch, { nav, routeTo } ) => ( {
    
    dispatchFetchTeamDetails: () => dispatch( fetchTeamDetails() ),
    dispatchLoadRecord: when => dispatch( load( when ) ),
    dispatchSave: ( when, scores ) => dispatch( save( { when, scores } ) ),
    navigateToWhen: when => nav( routeTo( RECORD, { when } ), "Record an assessment for " + when )
    
} );


export default connect( mapStateToProps, mapDispatchToProps )( RecordContainer );