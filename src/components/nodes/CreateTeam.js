import React, { Component } from "react";

import "./CreateTeam.css";

class CreateTeam extends Component {
    
    handleChange( e ) {
    
        if ( !e.target ) return;
        const { name, value } = e.target;
        const { populate } = this.props;
        populate( { [ name ]: value } );

    }
    
    handleSubmit( e ) {
        
        e.preventDefault();
        this.props.create();

    }
    
    renderField( label, key, placeholder, fieldType = "text") {
        
        const { creating } = this.props;
        return <label>
        
            <span className="label-text">{ label }</span>
            <input  disabled={ creating }
                    type={ fieldType } 
                    name={ key }
                    onChange={this.handleChange.bind( this )}
                    placeholder={ placeholder || `Your team's ${key}` }
                    value={ this.props[ key ] || "" } />
        
        </label>;
                
    }
    
    renderCreating() {
        
        if ( !this.props.creating ) return null;
        return <div className="creating-message">Creating...</div>;
        
    }
    
    renderError() {
        
        const { err } = this.props;
        if( !err ) return null;
        return <section className="error-message">
            
            <h3>Error</h3>
            { err.message || err.toString() }
            
        </section>;
        
    }
    
    render() {
        
        return <article className="create-team">
    
            <p>Here's where you can establish a new team</p>
            <form onSubmit={ this.handleSubmit.bind( this ) }>
            
                { this.renderField( "Name", "name" ) }
                { this.renderField( "Logo", "logo", "URL of a logo for your team" ) }
                <figure className="logo">
                
                    <img src={ this.props.logo || "//dummyimage.com/200x200/777777/abcdef&text=e.g.+200x200" } alt="team logo" />
                    <figcaption>A preview of your team's awesome logo</figcaption>
                
                </figure>
                <button type="submit">Create!</button>
                { this.renderCreating()  }
                { this.renderError() }
                
            </form>
            
        </article>;
        
    }
    
}

export default CreateTeam;