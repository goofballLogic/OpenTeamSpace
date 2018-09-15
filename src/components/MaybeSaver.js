import React from "react";

import "./MaybeSaver.css";

const MaybeSaver =

    ( { onSave, isDirty } ) =>
    
        <form className="maybe-saver" onSubmit={ onSave }>
            
            <button disabled={ !( onSave && isDirty ) } className={isDirty ? "save needed" : "save"}>Save</button>
                
        </form>;
        
export default MaybeSaver;