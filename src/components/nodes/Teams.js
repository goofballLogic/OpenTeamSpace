import React from "react";
import MaybeLoading from "../MaybeLoading";

import "./Teams.css";

const Teams = 

    ( { loading, teams = [], selectTeam, selected } ) => 
 
        <MaybeLoading className="teams" loading={ loading }>

            {selected && <div>
            
                <h2>Selected team</h2>
                <div className="team">
                
                    <div className="name">{selected.name}</div>
                    <div className="logo"><img src={ selected.logo } /></div>
    
                </div>
                
            </div>}
            <h2>Teams</h2>
            <form>
            
                {teams.filter( x => x.id !== ( selected || {} ).id ).map( ( { id, name, logo } ) => <button className="team" key={id} type="button" onClick={e => { e.preventDefault(); selectTeam( id ) }}>
                
                    <div className="name">{name}</div>
                    <div className="logo"><img src={ logo } /></div>
                    
                </button> )}
                
            </form>

        </MaybeLoading>;

export default Teams;