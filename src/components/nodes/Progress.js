import React from "react";
import MaybeLoading from "../MaybeLoading";

import "./Progress.css";

const Progress = 

    ( { selected, metrics, isMetricsLoading } ) =>
    
        <MaybeLoading className="progress" loading={isMetricsLoading} text="Loading...">

            Hello there this is progress
            <pre>
            
                {JSON.stringify( selected, null, 3 )}
            
            </pre>
            <pre>
            
                {JSON.stringify( metrics, null, 3 )}
                
            </pre>
            
        </MaybeLoading>;
        
export default Progress;
