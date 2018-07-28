import React, { Component } from "react";

import TeamEditorTest from "../containers/TeamEditorTest";
import "./SelfTest.css";
import { enterValueInField } from "./test-utilities";

const TeamEditorTestComponent = () => <section className="team-editor-test">

    <TeamEditorTest />

</section>;

function executeStep( step ) {
    
    try { step(); } catch( ex ) { return ex; }

}

const teamEditorSteps = [
    
    function populateTeamName() { 
        
        const nameInput = document.querySelector( ".team-editor-test .team-name-editor" );
        enterValueInField( nameInput, "My team" );
        
    }
    
];

class SelfTest extends Component {
 
    constructor() {
        
        super();
        this.state = { errors: [] };
        
    }
    
    recordError( err ) {
        
        if ( !err ) return;
        const { lastStep, errors } = this.state;
        errors.push( { step: lastStep, caught: err } );
        this.setState( { errors } );
        
    }

    componentDidMount() {
        
        const errorHandler = window.addEventListener( "error", e => { 
        
            e.preventDefault();
            this.recordError( e.error );

        }, true );
        this.removeErrorHandler = () => window.removeEventListener( "error", errorHandler );
        
    }
    
    componentWillUnmount() {
        
        this.removeErrorHandler();
        
    }
    
    componentDidCatch( caught ) {
        
        this.recordError( caught );
        
    }
    
    executeStep( step ) {

        this.setState( { lastStep: step } );
        setTimeout( () => {
            
            const caught = executeStep( step );
            if ( caught ) this.recordError( caught );
            
        }, 10 );

    }
    
    render() { 
        
        return <article className="self-test">

            <h1>Self test page</h1>
            {teamEditorSteps.map( ( step, i ) => <div key={i}>
                
                <button onClick={() => this.executeStep( step )}>Step {i} ( {step.name} )</button>
                
            </div>)}
            <TeamEditorTestComponent />
            {this.state.errors.map( ( e, i ) => console.log( e ) || <div key={i}>
                <h4>Error</h4>
                {Object.keys( e )}
                
            </div> )}
            
        </article>;
        
    }
    
}
export default SelfTest;
