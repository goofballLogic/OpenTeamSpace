import React, { Component } from "react";
import { Saving } from "tc2-react-simple-storage";

class Storage extends Component {
    
    render() {
        
        const { storageContext, changeContext, handleError } = this.props;
        return <Saving context={ storageContext } onContextChange={ changeContext } onError={ handleError } />;
        
    }
    
}

export default Storage;