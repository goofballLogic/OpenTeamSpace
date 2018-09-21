/*global CustomEvent*/
import React, { Component } from "react";
import EventListener from "eventemitter3";

import "./routing.css";
import route, { HOME, isAuthorized, matchRoute } from "./routes";

const { location, history, URL } = global;
const linkEventListener = new EventListener();

function locationView( url = new URL( location ) ) {
    
    const view = url.searchParams.get( "view" );
    if ( !view ) return HOME;
    return decodeURIComponent( view ) || HOME;
    
}

const selectMap = url => matchRoute( locationView( url ) );

const ANIMATE_DURATION = 1;

function nav( href, name ) {

    history.pushState( null, null, href );
    linkEventListener.emit( "link" );
    document.dispatchEvent( new CustomEvent( "after-navigation", { detail: { name } } ) );
    
}

export class Link extends Component {
    
    handleClick( e, name, href ) {
        
        e.preventDefault();
        nav( href, name );
        
    }
    
    renderEnabledLink() {
        
        const { name, to, from, className, children } = this.props;
        const href = `?view=${to}${from ? `&from=${from}` : ""}`;
        const linkClassName = `routing-link ${className || ""}`;
        const clickHandler = e => this.handleClick( e, name, href );
        return <a onClick={clickHandler} href={href} className={linkClassName}>{children}</a>;

    }
    
    renderDisabledLink() {
        
        const { className, children } = this.props;
        const linkClassName = `routing-link routing-link-disabled ${className || ""}`;
        return <span className={ linkClassName }>{children}</span>;
        
    }
    
    render() {
        
        const { disabled } = this.props;
        return disabled ? this.renderDisabledLink() : this.renderEnabledLink();
        
    }
    
}

const mapRoute = props => ( route, { prefix = "" } ) => {
    
    const linkRoute = matchRoute( route );
    const text = `${prefix}${linkRoute.name}`;
    const disabled = !isAuthorized( route, props );
    let to = route;
    const teamid = ( props && props.teams && props.teams.selected && props.teams.selected.id ) || "?";
    to = to.replace( /:teamid/g, teamid );
    to = to.replace( /:when/g, ( new Date() ).toISOString().substring( 0, 10 ) );
    return <Link disabled={disabled} key={ route } to={ to } name={ linkRoute.name }>
        
        {text}
            
    </Link>;
    
};

export const FromLink = 

    ( { props, fromValue = new URL( location ).searchParams.get( "from" ) } ) => 
    
        fromValue 
            ? mapRoute( props )( fromValue, { prefix: "Back to " } ) 
            : null;

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
        const navClassName = `routing-nav ${className}`;
        return <nav className={navClassName}>

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

            const routing = route( locationView(), this.props );
            const ViewComponent = routing.component;
            return <ViewComponent nav={ nav } params={routing.params} />;
            
        } catch( ex ) {
            
            return this.renderError( ex );
            
        }

    }

}