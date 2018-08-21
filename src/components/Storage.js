import React from "react";
import { Saving } from "tc2-react-simple-storage";
import "./Storage.css";

const titleForContext = 
    ( { connected, connecting } ) => 
        connected ? "Data store connected" : connecting ? "Connecting..." : "Select a data folder";

const CancelButton = 
    ( { connected, connecting, cancelContext } ) => 
        ( connected || connecting ) 
            ? <button onClick={ cancelContext }>{ connected ? "Disconnect" : "Cancel" }</button>
            : null;
        
const Storage = ( { context = {}, cancelContext, changeContext, handleError } ) =>

    <article className="storage">

        <header>
        
            <h2>{ titleForContext( context ) }</h2>
            { context.provider ? null : <p>
                In order to persist your data, you need to connect to a storage account such as your Google Drive or OneDrive account.
                The location you select should be an empty folder where your data can be persisted without overwriting other files.
                A metadata file named <code>index.json</code> will be generated, identifying OTS when you reconnect in the future.
            </p> }
            
        </header>
        
        { !context.connected ? null : <p>
        
            You are connected to the data folder you selected: <code>{context.connected.path().join( "/")}</code>.
            OTS will create and update files in this folder with the data you generate while using the system.
            If you want to disconnect from this folder you can use the button below:
            
        </p> }
        <CancelButton {...context} cancelContext={ cancelContext } />
        { !context.connected ? null : <header className="change-folder">
        
            <h2>Change folder</h2>
            <p>
                
                You can select a new folder below. Note that this will disconnect you from your currently connected folder.
                
            </p>

        </header> }
        <Saving context={ context } onContextChange={ changeContext } onError={ handleError } />
                
    </article>

;

export default Storage;