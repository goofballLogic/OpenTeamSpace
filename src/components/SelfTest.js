import React, { Component } from "react";

import TeamEditorTest from "../containers/TeamEditorTest";
import "./SelfTest.css";


const TeamEditorTestComponent = () => <section className="team-editor-test">

    <TeamEditorTest />

</section>;

function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
  
  if (valueSetter && valueSetter !== prototypeValueSetter) {
  	prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
  const evt = new Event( "change", { bubbles: true } );
  element.dispatchEvent( evt );
}

const teamEditorSteps = [
    
    function populateTeamName() { 
        
        const nameInput = document.querySelector( ".team-editor-test .team-name-editor" );
        setNativeValue( nameInput, "My team" );

    }
    
];
class SelfTest extends Component {
 
    componentDidCatch( e ) {
        
        console.error( "Caught", e );
        
    }
    
    render() { 
        
        return <article className="self-test">

            <h1>Self test page</h1>
            {teamEditorSteps.map( ( step, i ) => <div key={i}>
                
                <button onClick={() => step()}>Step {i} ( {step.name} )</button>
                
            </div>)}
            <TeamEditorTestComponent />
            
        </article>;
        
    }
    
}
export default SelfTest;
