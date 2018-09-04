import React from "react";
import MaybeLoading from "../MaybeLoading";
import { Link, FromLink } from "../routing";
import { CREATE_TEAM } from "../routes";
import Team, { TeamButton } from "./Team";

import "./Teams.css";

const Teams = 

    ( { loading, teams = [], selectTeam, selected, unselected } ) => 
 
        <MaybeLoading className="teams" loading={ loading }>

            {selected && <div>
            
                <FromLink props={ this.props } />
                <h2>Selected team</h2>
                <Team {...selected} />
                
            </div>}
            <h2>Teams</h2>
            { ( unselected && unselected.length )
            
                ? <form>
            
                    {unselected.map( ( { id, name, logo } ) => 
                    
                        <TeamButton key={id} name={ name} logo={ logo }
                            type="button" 
                            onClick={e => { e.preventDefault(); selectTeam( id ) }} />
                    
                    )}
                    
                </form>
                : <div>
            
                    <p>No {selected ? "other" : ""} teams found. You can create one: <Link to={ CREATE_TEAM }>Create a team</Link></p>
                
                </div>}

        </MaybeLoading>;

export default Teams;