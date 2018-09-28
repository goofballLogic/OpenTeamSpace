import React from "react";
import Team from "./Team";

const CurrentTeam =

    ( { selected }) =>
    
        ( selected || null ) && <Team {...selected} />;
        
export default CurrentTeam;
