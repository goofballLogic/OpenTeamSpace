import React from "react";
import { Saving } from "tc2-react-simple-storage";
import "./Storage.css";


const FolderSelected = ( { context, cancelContext } ) =>

    <div>
    
        { context.connecting
            ? <h2>Waiting for data store connection</h2>
            : <h2>Data store connected</h2> }
            
        <button onClick={ cancelContext }>{ context.connecting ? "Cancel" : "Disconnect" }</button>

    </div>
    
;
        

const SelectFolder = ( { context = {}, changeContext, handleError } ) => 

    <div>
    
        { context.provider 
            ? <h2>Selected data store:</h2> 
            : <h2>Choose a data store:</h2> }
        <Saving 
            context={ context } 
            onContextChange={ changeContext } 
            onError={ handleError } />
    
    </div>

;
 
const Storage = props =>

    <article className="storage">
        
        { props.context 
            && ( props.context.connected || props.context.connecting ) 
            && <FolderSelected {...props} /> }
        <SelectFolder {...props} />
                
    </article>

;

export default Storage;