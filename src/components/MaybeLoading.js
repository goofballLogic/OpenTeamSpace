import React from "react";

import "./MaybeLoading.css";

const Processing =

    ( { text } ) =>
    
        <div className="processing">{text}</div>;
        
const MaybeLoading =
    
    ( { loading, text = "Loading...", saving, savingText = "Saving...", className, children } ) => 
    
        <section className={`${className} maybe-loading`}>
    
            {loading && <Processing text={text} />}
            {saving && <Processing text={savingText} />}
            {children}
            
        </section>;

export default MaybeLoading;