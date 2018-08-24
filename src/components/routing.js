/*global CustomEvent*/
import React, { Component } from "react";
import EventListener from "eventemitter3";

import "./routing.css";
import route, { map as routingMap, HOME, isAuthorized } from "./routes";

const { location, history, URL } = global;
const linkEventListener = new EventListener();

const locationView = 
    ( url = new URL( location ) ) =>
        decodeURIComponent( url.searchParams.get( "view" ) ) || HOME;

const selectMap = 
    url => 
        routingMap[ locationView( url ) ] || {};

const ANIMATE_DURATION = 1;

function nav( href, name ) {

    history.pushState( null, null, href );
    linkEventListener.emit( "link" );
    document.dispatchEvent( new CustomEvent( "after-navigation", { detail: { name } } ) );
    
}

export class Link extends Component {
    
    handleClick( e, name ) {
        
        e.preventDefault();
        nav( e.target.href, name );
        
    }
    
    renderEnabledLink() {
        
        const { name, to, from, className, children } = this.props;
        return <a onClick={e => this.handleClick( e, name )} href={`?view=${to}${from ? `&from=${from}` : ""}`} className={`routing-link ${className || ""}`}>
    
            {children}
    
        </a>;

    }
    
    renderDisabledLink() {
        
        const { className, children } = this.props;
        return <span className={`routing-link routing-link-disabled ${className || ""}`}>
        
            {children}
            
        </span>;
        
    }
    
    render() {
        
        const { disabled } = this.props;
        return disabled ? this.renderDisabledLink() : this.renderEnabledLink();
        
    }
    
}



const mapRoute = props => ( route, prefix ) => 

    <Link disabled={!isAuthorized( route, props )} key={ route } to={ route } name={ routingMap[ route ].name }>
        
        { prefix }{ routingMap[ route ].name }
            
    </Link>

;

export const FromLink = 
    ( { props, fromValue = new URL( location ).searchParams.get( "from" ) } ) => 
        fromValue ? mapRoute( props )( fromValue, "Back to " ) : null;

export class Nav extends Component {

    listener() {

        this.setState( { href: location.href } );

    }

    componentDidMount() {

        linkEventListener.on( "link-complete", () => this.listener() );

    }

    componentWillUnmount() {

        linkEventListener.off( "link-complete", () => this.listener() );

    }

    render() {

        const { url, className = "" } = this.props;
        const map = selectMap( url );
        const { back = [], forward = [], secondary = [] } = map;
        const linkBuilder = mapRoute( this.props );
        return <nav className={`routing-nav ${className}`}>

            {back.length ? <div className="routing-nav-backwards">

                {back.map( linkBuilder )}

            </div> : null}
            <h1>{map.name}</h1>
            {forward.length ? <div className="routing-nav-forwards">

                {forward.map( linkBuilder )}

            </div> : null}
            {secondary.length ? <div className="routing-nav-secondary">

                {secondary.map( linkBuilder )}

            </div> : null}

        </nav>;

    }

}

export class Router extends Component {

    constructor() {

        super();
        this.listener = this.listener.bind( this );
        this.state = {};

    }

    listener() {

        if( this.animating ) {

            clearTimeout( this.animating );
            document.body.classList.remove( "routing-in" );
            document.body.classList.add( "routing-out" );

        }
        this.animating = setTimeout( () => {

            this.animating = setTimeout( () => document.body.classList.remove( "routing-in" ), ANIMATE_DURATION / 2 );
            document.body.classList.add( "routing-in" );
            document.body.classList.remove( "routing-out" );
            this.setState( { href: location.href } );
            linkEventListener.emit( "link-complete" );

        }, ANIMATE_DURATION / 2 );
        document.body.classList.remove( "after-routing" );

    }

    componentDidCatch( ex ) {
        
        window.dispatchEvent( new CustomEvent( "caught-error", { detail: ex } ) );
        this.setState( { error: ex } );

    }
    
    componentDidMount() {

        linkEventListener.on( "link", this.listener );
        window.addEventListener( "popstate", this.listener );

    }

    componentWillUnmount() {

        linkEventListener.off( "link", this.listener );
        window.removeEventListener( "popstate", this.listener );

    }

    goBack() {
        
        this.setState( { error: null } );
        history.back();
        
    }
    
    renderError( ex ) {
        
        return <article className="error">
            
            <h1>An error occurred</h1>
            <pre>{ ex.message }</pre>
            <p><button onClick={() => this.goBack()}>Go back</button></p>
            
        </article>;
        
    }
    
    render() {

        if ( this.state.error ) {
            
            return this.renderError( this.state.error );
            
        }
        try {

            const Component = route( locationView(), this.props );
            return <Component nav={ nav } />;
            
        } catch( ex ) {
            
            return this.renderError( ex );
            
        }

    }

}