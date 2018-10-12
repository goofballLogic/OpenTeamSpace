import React, { Component } from "react";
import MaybeLoading from "../MaybeLoading";

import "./EditTeam.css";

class EditTeam extends Component {
    
    constructor() {
        
        super();
        this.state = { editing: {} };
        
    }
    
    deriveStateFromProps() {
        
        const { id, name, logo, isLoading } = this.props;
        if ( isLoading ) return;
        let { editing = {} } = this.state;
        if ( editing.id !== id ) {

            editing = { id, name, logo };
            this.setState( { editing } );
            
        }

    }
    
    componentDidMount() {
        
        this.deriveStateFromProps();
        
    }

    componentDidUpdate() {
        
        this.deriveStateFromProps();
        
    }
    
    handleChange( e ) {
    
        if ( !e.target ) return;
        const { name, value } = e.target;
        const { editing } = this.state;
        editing[ name ] = value;
        this.setState( { editing } );

    }
    
    handleSubmit( e ) {
        
        e.preventDefault();
        const { editing } = this.state;
        this.props.save( editing );

    }
    
    renderField( label, key, placeholder, fieldType = "text") {
        
        const { saving } = this.props;
        const { editing } = this.state;
        return <label>
        
            <span className="label-text">{ label }</span>
            <input  disabled={ saving }
                    type={ fieldType } 
                    name={ key }
                    onChange={this.handleChange.bind( this )}
                    placeholder={ placeholder || `Your team's ${key}` }
                    value={ editing[ key ] || "" } />
        
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
        
        const { editing = {} } = this.state;
        const { isLoading, isSaving } = this.props;
        
        return <MaybeLoading className="create-team" loading={isLoading} saving={isSaving}>
    
            <p>Here's where you can establish a new team</p>
            <form onSubmit={ this.handleSubmit.bind( this ) }>
            
                { this.renderField( "Name", "name" ) }
                { this.renderField( "Logo", "logo", "URL of a logo for your team" ) }
                <figure className="logo">
                
                    <img src={ editing.logo || "//dummyimage.com/200x200/777777/abcdef&text=e.g.+200x200" } alt="team logo" />
                    <figcaption>A preview of your team's awesome logo</figcaption>
                
                </figure>
                <button type="submit">Save</button>
                { this.renderCreating()  }
                { this.renderError() }
                
            </form>
            
        </MaybeLoading>;
        
    }
    
}

export default EditTeam;