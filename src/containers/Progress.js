import React, { Component } from "react";
import Progress from "../components/nodes/Progress";
import { connect } from "react-redux";
import { load } from "../actions/metrics";

class ProgressContainer extends Component {
    
    
    ensureMetrics() {
        
        const { 
            isMetricsLoaded, isMetricsLoading,
            dispatchLoadMetrics
        } = this.props;
        if ( ! ( isMetricsLoaded || isMetricsLoading ) ) {
            
            dispatchLoadMetrics();
            
        }
        
    }
    
    componentDidMount() {
        
        this.ensureMetrics();
        
    }
    
    componentDidUpdate() {
        
        this.ensureMetrics();
        
    }
    
    render() {
        
        return <Progress {...this.props} />;
        
    }
    
}

const mapStateToProps = ( { teams, metrics = {} } ) => ( { 
    
    selected: teams.selected,
    metrics: metrics.data,
    isMetricsLoading: metrics.loading,
    isMetricsLoaded: !!metrics.data
    
} );

const mapDispatchToProps = ( dispatch ) => ( {
    
    dispatchLoadMetrics: () => dispatch( load( Date.now() ) )
    
} );


export default connect( mapStateToProps, mapDispatchToProps )( ProgressContainer );