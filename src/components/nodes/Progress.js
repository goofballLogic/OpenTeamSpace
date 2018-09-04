import React from "react";
import Team from "./Team";

import "./Progress.css";

const Progress = 

    ( { selected } ) =>
    
        <article className="progress">

            <Team {...selected} />
        
        </article>;
        
export default Progress;
