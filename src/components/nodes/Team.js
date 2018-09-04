import React from "react";

import "./Team.css";

const Team = 

    ( { name, logo } ) =>
    
        <div className="team">
                
            <div className="name">{name}</div>
            <div className="logo"><img src={logo } alt="team logo" /></div>

        </div>;
        
const TeamButton =

    props =>
    
        <button className="team" {...props} name={null} logo={null}>
        
            <div className="name">{props.name}</div>
            <div className="logo"><img src={props.logo } alt="team logo" /></div>
            
        </button>;
        
export default Team;
export { TeamButton };