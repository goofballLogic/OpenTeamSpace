import React from "react";

import "./MaybeLoading.css";

const Loading =

    ( { text } ) =>
    
        <div className="loading">{text}</div>;
        
const MaybeLoading =
    
    ( { loading, text = "Loading...", className, children } ) => 
    
        <section className={`${className} maybe-loading`}>
    
            {loading && <Loading text={text} />}
            {children}
            
        </section>;

export default MaybeLoading;