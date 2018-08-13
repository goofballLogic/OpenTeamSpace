import React, { Component } from "react";
import { Saving } from "tc2-react-simple-storage";
import "./Storage.css";

class Storage extends Component {
    
    render() {
        
        const { storageContext, changeContext, handleError } = this.props;
        const { provider } = storageContext;
        return <article className="storage">
        
            { provider 
                ? <h2>Selected data store:</h2> 
                : <h2>Choose a data store:</h2> }
            <Saving 
                context={ storageContext } 
                onContextChange={ changeContext } 
                onError={ handleError } />
            
        </article>;
        
    }
    
}

export default Storage;