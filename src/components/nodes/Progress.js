import React from "react";
import MaybeLoading from "../MaybeLoading";
import DateRangeSelect from "./DateRangeSelect";
import { TimeSeriesGraph, TimeSeriesTable } from "tc2-react-time-series-graph";
import { ProfileCard } from "tc2-react-simple-teams";
import format from "date-fns/format";

import "./Progress.css";

const TeamList =

    ( { profiles = [] } ) =>
    
        <article className="team-list">
        
            <h1>Meet the team</h1>
            {profiles.length
            
                ? profiles.map( profile => <ProfileCard key={profile.id} {...profile} /> )
                : <p>You've got no team members yet. You should add some!</p>
                
            }
            
        </article>;

const formatTickDate = when => format( when, "MMMM Do YYYY" );
const formatTooltipDate = when => format( when, "dddd, MMMM Do YYYY" );

const NoMetrics =

    () =>
    
        <section className="no-metrics">
        
            <h1>Welcome</h1>
            <p>Your team has no data to show yet. Once you start recording measurements, they will show up here</p>
        
        </section>;
        
const Metrics =

    ( { onDateFilterChange, dateFilter, series, data, onSelectWhen } ) =>
    
        <section className="metrics">
        
            <DateRangeSelect onChange={ onDateFilterChange } {...dateFilter} />
            <TimeSeriesGraph series={ series } data={ data } formatTickDate={ formatTickDate } formatTooltipDate={ formatTooltipDate } minTickGap={ 30 } />
            <h2>Detail</h2>
            <TimeSeriesTable series={ series } data={ data } selectWhen={ onSelectWhen } />
        
        </section>;
        
const Progress = 

    props =>
    
        <MaybeLoading className="progress" loading={props.isMetricsLoading || props.isTeamDetailsLoading} text="Loading...">
    
            <h1>Progress</h1>
            <button onClick={() => props.onRefresh()} mode="button">Refresh</button>
            {( props.series && props.data )
                ? <Metrics {...props} />
                : props.isMetricsLoading
                    ? null
                    : <NoMetrics />
            }
            {props.selected && props.selected.details && <TeamList {...props.selected.details} />}

        </MaybeLoading>;
        
export default Progress;
