import React, { Component } from "react";
import Progress from "../components/nodes/Progress";
import { connect } from "react-redux";
import { load } from "../actions/metrics";
import { calculateSeries, calculateData, withZeros } from "../logic/analysis";
import { fetchTeamDetails } from "../actions/teams";

const toDateInputValue = when => new Date( when ).toISOString().substring( 0, 10 );

class ProgressContainer extends Component {
    
    constructor() {
        
        super();
        this.state = { selectedWhens: [] };
        
    }
    
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
        
        this.setState( { selectedWhens: [] } );
        this.ensureMetrics();
        this.ensureTeamDetails();
        
    }
    
    componentDidUpdate() {
        
        this.ensureMetrics();
        this.ensureTeamDetails();
        
    }
    
    selectWhen( when ) {
        
        let { selectedWhens } = this.state;
        if ( selectedWhens.includes( when ) ) {
            
            selectedWhens = selectedWhens.filter( x => x !== when );
            
        } else {
            
            selectedWhens = [ ...selectedWhens, when ];
            
        }
        this.setState( { selectedWhens } );
        
    }
    
    handleDateFilterChange( dateFilterStart, dateFilterEnd ) {
        
        this.setState( { 
            
            dateFilterStart: Date.parse( dateFilterStart ),
            dateFilterEnd: Date.parse( dateFilterEnd )
            
        } );
        
    }
    
    buildDateFilter( data = [] ) {
        
        const { dateFilterStart, dateFilterEnd } = this.state;
        const now = Date.now();
        const minWhen = data.length 
            ? data.map( x => x.when ).reduce( ( result, x ) => Math.min( result, x ) )
            : now;
        const maxWhen = data.length
            ? data.map( x => x.when ).reduce( ( result, x ) => Math.max( result, x ) )
            : now;
        const startValue = toDateInputValue( dateFilterStart || minWhen );
        const endValue = toDateInputValue( dateFilterEnd || maxWhen );
        return {
            
            start: {
                
                value: startValue,
                min: toDateInputValue( minWhen ),
                max: endValue
            
                
            },
            
            end: {
                
                value: endValue,
                min: startValue,
                max: toDateInputValue( maxWhen )
                
            }
            
        };
        
    }
    
    dateFilter( data, filter ) {
    
        const start = filter.start.value;
        const end = filter.end.value;
        return data.filter( x => {
            
            const whenString = toDateInputValue( x.when );
            return whenString >= start && whenString <= end;
            
        } );
        
    }
    
    render() {
        
        const { data } = this.props;
        const { selectedWhens } = this.state;
        const selectableData = data ? data.map( x => ( { ...x, selected: selectedWhens.includes( x.when ) } ) ) : [];
        const zeroedData = withZeros( selectableData );
        const dateFilter = this.buildDateFilter( zeroedData );
        const filteredData = this.dateFilter( zeroedData, dateFilter );
        return <Progress {...this.props} 
            data={ filteredData }
            dateFilter={ dateFilter }
            onDateFilterChange={ this.handleDateFilterChange.bind( this ) }
            onRefresh={ () => this.refreshData() } 
            onSelectWhen={ this.selectWhen.bind( this ) } />;
        
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