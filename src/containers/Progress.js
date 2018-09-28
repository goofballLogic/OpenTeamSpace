import React, { Component } from "react";
import Progress from "../components/nodes/Progress";
import { connect } from "react-redux";
import { load } from "../actions/metrics";
import { calculateSeries, calculateData } from "../logic/analysis";
import { fetchTeamDetails } from "../actions/teams";

class ProgressContainer extends Component {
    
    ensureTeamDetails() {
    
        const { 
            
            selectedFolder, selected,
            isTeamDetailsLoaded, isTeamDetailsLoading, 
            dispatchFetchTeamDetails
            
        } = this.props;
        if ( !( isTeamDetailsLoaded || isTeamDetailsLoading ) ) {
            
            dispatchFetchTeamDetails( selected, selectedFolder );
            
        }
        
    }
    
    ensureMetrics() {
        
        const { 
            
            isMetricsLoaded, isMetricsLoading,
            dispatchLoadMetrics
            
        } = this.props;
        if ( ! ( isMetricsLoaded || isMetricsLoading ) ) {
            
            dispatchLoadMetrics();
            
        }

    }
    
    refreshData() {
        
        const {
            
            selectedFolder, selected,
            dispatchFetchTeamDetails, dispatchLoadMetrics
            
        } = this.props;
        dispatchFetchTeamDetails( selected, selectedFolder );
        dispatchLoadMetrics();
        
    }
    componentDidMount() {
        
        this.ensureMetrics();
        this.ensureTeamDetails();
        
    }
    
    componentDidUpdate() {
        
        this.ensureMetrics();
        this.ensureTeamDetails();
        
    }
    
    render() {
        
        return <Progress {...this.props} onRefresh={ () => this.refreshData() } />;
        
    }
    
}

const mapStateToProps = ( { teams, metrics = {} } ) => ( { 
    
    selected: teams.selected,
    isTeamDetailsLoaded: teams.selected && teams.selected.details,
    isTeamDetailsLoading: teams.selected && teams.selected.loading,
    
    metrics: metrics.data,
    isMetricsLoading: metrics.loading,
    isMetricsLoaded: !!metrics.data,
    
    series: teams.selected && teams.selected.details && calculateSeries( teams.selected.details.profiles ),
    data: metrics.data && calculateData( metrics ),
    
} );

const mapDispatchToProps = ( dispatch ) => ( {
    
    dispatchLoadMetrics: () => dispatch( load( Date.now() ) ),
    dispatchFetchTeamDetails: ( selected, selectedFolder ) => dispatch( fetchTeamDetails( selected, selectedFolder ) ),
    
} );


export default connect( mapStateToProps, mapDispatchToProps )( ProgressContainer );