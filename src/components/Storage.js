import React, { Component } from "react";
import { Saving } from "tc2-react-simple-storage";
import "./Storage.css";

const FolderSelected = ( { storageContext } ) => 
console.log( storageContext ) || 

    <div>
    
        Selected folder: { storageContext.selectedFolder.current.name }
        
    </div>
    
;

const SelectFolder = ( { storageContext = {}, changeContext, handleError } ) => 

    <div>
    
        { storageContext.provider 
            ? <h2>Selected data store:</h2> 
            : <h2>Choose a data store:</h2> }
        <Saving 
            context={ storageContext } 
            onContextChange={ changeContext } 
            onError={ handleError } />
    
    </div>

;
 
const Storage = ( props ) =>

    <article className="storage">
        
        { props.storageContext && props.storageContext.selectedFolder
            ? <FolderSelected {...props} />
            : <SelectFolder {...props} /> }
                
    </article>

;

export default Storage;