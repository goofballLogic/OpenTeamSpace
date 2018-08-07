import React, { Component } from "react";

import TeamEditorTest from "../containers/TeamEditorTest";
import "./SelfTest.css";
import { enterValueInField } from "./test-utilities";


function executeStep( step ) {
    
    try { 
        
        step.action();
        step.verify();
        
    } catch( ex ) { 
        
        return ex;
        
    }

}

const assertEqual = ( expected, actual, thingDescription ) => {
    
    if ( actual === expected ) return;
    throw new Error( `Expected ${thingDescription}: ${expected}. Actual: ${actual}` );

};
    
const teamEditorSteps = [
    
    { 
        name: "Populate the team's name",
        action: () => { 
        
            const nameInput = document.querySelector( ".team-editor-tests .team-name-editor" );
            enterValueInField( nameInput, "My team" );
            
        },
        verify: () => {
            
            const nameInput = document.querySelector( ".team-editor-tests .team-name-editor" );
            if ( nameInput.value !== "My team" ) throw new Error( "Team name was not set as expected" );
            
        }
    },
    {
        name: "Specify team logo",
        action: () => {
            
            const logoInput = document.querySelector( ".team-editor-tests .team-logo-editor" );
            enterValueInField( logoInput, "//dummyimage.com/100x100/000/fff" );
    
        },
        verify: () => {
            
            const logo = document.querySelector( ".team-editor-tests .team-logo" );
            const actual = logo.src;
            if ( !actual.endsWith( "//dummyimage.com/100x100/000/fff" ) ) throw new Error( `Expected logo: //dummyimage.com/100x100/000/fff but found ${actual}` );
            
        }
        
    },
    {
        name: "Specify a team member",
        action: () => {
            
            const firstProfileCard = document.querySelector( ".team-editor-tests .profile-card" );
            firstProfileCard.click(); // select for editing
            const cardEditorForm = document.querySelector( ".team-editor-tests .profile-card-editor" );
            enterValueInField( cardEditorForm.name, "Bagi" );
            enterValueInField( cardEditorForm.blurb, "Used to be a good friend" );
            enterValueInField( cardEditorForm.colour, "#123456" );
            enterValueInField( cardEditorForm.avatar, "kangaroo" );
            firstProfileCard.click(); // deselect for editing
            
        },
        verify: () => {
            
            const teamEditor = document.querySelector( ".team-editor-tests .team-editor" );
            if ( teamEditor.classList.contains( "editing" ) ) throw new Error( "Card was not deselected after editing" );
            const profileCardEditor = document.querySelector( ".team-editor-tests .profile-card-editor" );
            if ( profileCardEditor ) throw new Error( "Profile card editor did not disappear after deselecting the profile card" );
            const firstProfileCard = document.querySelector( ".team-editor-tests .profile-card" );
            assertEqual( "Bagi", firstProfileCard.querySelector( ".profile-name" ).textContent, "profile name" );
            assertEqual( "Used to be a good friend", firstProfileCard.querySelector( ".profile-blurb" ).textContent, "profile blurb" );
            assertEqual( "#123456", window.getComputedStyle( firstProfileCard ).getPropertyValue( "--profile-color" ).trim(), "profile color" );
            assertEqual( "ellipse", firstProfileCard.querySelector( ".profile-avatar" ).firstChild.firstChild.firstChild.tagName, "profile avatar" );

        }
    }
    
];

class SelfTest extends Component {
 
    constructor() {
        
        super();
        this.state = { results: [] };
        
    }
    
    recordError( caught ) {
        
        if ( !caught ) return;
        const { currentResult } = this.state;
        currentResult.caught = caught;
        this.setState( { currentResult } );
        
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

        const { results } = this.state;
        const currentResult = { step };
        results.push( currentResult );
        this.setState( { results, currentResult } );
        setTimeout( () => {
            
            const caught = executeStep( step );
            if ( caught ) this.recordError( caught );
            
        }, 10 );

    }
    
    renderTestResults() {
        
        const { results } = this.state;
        if ( !( results && results.length ) ) return null;
        return <div>
        
            <h4>Results</h4>
            {results.map( ( result, i ) => <div key={i} className={result.caught ? "fail-result" : "success-result"}>
                
                <h5 className="step-name">#{i + 1} {result.step && result.step.name}</h5>
                {result.caught && <pre>{result.caught.stack || result.caught.message || result.caught}</pre>}
                
            </div> )}
            
        </div>;
        
    }
    
    renderTeamEditorTests(){
        
        return <section className="team-editor-tests">
        
            {teamEditorSteps.map( ( step, i ) => <div key={i}>
                
                <button onClick={() => this.executeStep( step )}>Step {i + 1} ( {step.name} )</button>
                
            </div>)}
            {this.renderTestResults()}
            <TeamEditorTest />
            
        </section>;

    }
    
    render() { 
        
        
        return <article className="self-test">

            <h1>Self test page</h1>
            {this.renderTeamEditorTests()}
            
        </article>;
        
    }
    
}
export default SelfTest;
