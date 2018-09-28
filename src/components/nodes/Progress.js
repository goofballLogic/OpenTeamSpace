import React from "react";
import MaybeLoading from "../MaybeLoading";

import { TimeSeriesGraph, TimeSeriesTable } from "tc2-react-time-series-graph";
import { ProfileCard } from "tc2-react-simple-teams";

import "./Progress.css";

const TeamList =

    ( { profiles = [] } ) =>
    
        <article className="team-list">
        
            <h1>Meet the team</h1>
            {profiles.map( 
        
                profile =>
            
                    <ProfileCard key={profile.id} {...profile} />
                
            )}
            
        </article>;
    
const Progress = 

    ( { 
    
        isMetricsLoading, isTeamDetailsLoading,
        selected, metrics, series, data,
        onRefresh
        
    } ) =>
    
        <MaybeLoading className="progress" loading={isMetricsLoading || isTeamDetailsLoading} text="Loading...">
    
            <h1>Progress</h1>
            <button onClick={() => onRefresh()} mode="button">Refresh</button>
            {series && data && <TimeSeriesGraph series={ series } data={ data } />}
            {series && data && [
                
                <h2 key="detail">Detail</h2>,
                <TimeSeriesTable key="table" series={ series } data={ data } />
                
            ]}
            {selected && selected.details && <TeamList {...selected.details} />}

        </MaybeLoading>;
        
export default Progress;
