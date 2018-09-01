import React from "react";
import MaybeLoading from "../MaybeLoading";
import { Link } from "../routing";
import { CREATE_TEAM } from "../routes";

import "./Teams.css";

const Teams = 

    ( { loading, teams = [], selectTeam, selected, unselected } ) => 
 
        <MaybeLoading className="teams" loading={ loading }>

            {selected && <div>
            
                <h2>Selected team</h2>
                <div className="team">
                
                    <div className="name">{selected.name}</div>
                    <div className="logo"><img src={ selected.logo } /></div>
    
                </div>
                
            </div>}
            <h2>Teams</h2>
            { ( unselected && unselected.length )
            
                ? <form>
            
                    {unselected.map( ( { id, name, logo } ) => 
                    
                        <button className="team" key={id} type="button" onClick={e => { e.preventDefault(); selectTeam( id ) }}>
                    
                            <div className="name">{name}</div>
                            <div className="logo"><img src={ logo } /></div>
                            
                        </button> )}
                    
                </form>
                : <div>
            
                    <p>No {selected ? "other" : ""} teams found. You can create one: <Link to={ CREATE_TEAM }>Create a team</Link></p>
                
                </div>}

        </MaybeLoading>;

export default Teams;