import React from "react";
import MaybeLoading from "../MaybeLoading";
import { Link } from "../routing";
import { CREATE_TEAM } from "../routes";
import { TeamButton } from "./Team";

import "./Teams.css";

const Teams = 

    ( { loading, teams = [], selectTeam, selected, unselected } ) => 

        <MaybeLoading className="teams" loading={ loading }>

            {selected && <p>You have selected team {selected.name}. You can see the selected team under the navigation menu on the left hand side of the screen.</p>}
            <h2>Other teams</h2>
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