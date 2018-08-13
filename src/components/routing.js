/*global CustomEvent*/
import React, { Component } from "react";
import EventListener from "eventemitter3";

import { toast } from "react-toastify";

import "./routing.css";
import route, { map as routingMap, HOME, STORAGE } from "./routes";

const { location, history, URL } = global;
const linkEventListener = new EventListener();

const locationView = ( url = new URL( location ) ) =>
    decodeURIComponent( url.searchParams.get( "view" ) )
    || HOME;

const selectRoute = ( props, url ) => route( locationView( url ), props );

const selectMap = url => 
    routingMap[ locationView( url ) ]
    || {};

const ANIMATE_DURATION = 1;

function nav( href, name ) {

    history.pushState( null, null, href );
    linkEventListener.emit( "link" );
    document.dispatchEvent( new CustomEvent( "after-navigation", { detail: { name } } ) );
    
}

function reNav( e, name ) {

    e.preventDefault();
    nav( e.target.href, name );
    
}

export function maybeAuthorizeStorageRequirement( props ) {
    
    const { storage = {} } = props;
    const { context = {} } = storage;
    const isReady = context && context.connected;
    if ( !isReady ) return;
    const url = new URL( window.locaiton.href );
    const target = url.searchParams.get( "target" );
    if ( !target ) return;
    url.searchParams.delete( "target" );
    url.searchParams.set( "view", target );
    nav( url.toString(), "Back" );
    
}

export function requireStorageContext( props ) {
    
    const { storage = {} } = props;
    const { context = {} } = storage;
    const isReady = context && context.connected && context.selectedFolder;
    if ( isReady ) return true;
    toast( "Please sign in so that we know where to store your data." );
    const route = routingMap[ STORAGE ];
    const url = new URL( window.location.href );
    if ( !url.searchParams.get( "target" ) )
         url.searchParams.set( "target", url.searchParams.get( "view" ) );
    url.searchParams.set( "view", STORAGE );
    nav( url.toString(), route.name );
    return false;

}

export const Link = ( { className, to, children, name } ) =>

    <a onClick={e => reNav( e, name )} href={`?view=${to}`} className={`routing-link ${className || ""}`}>{children}</a>;

export class Nav extends Component {

    constructor() {

        super();
        this.listener = this.listener.bind( this );

    }

    listener() {

        this.setState( { href: location.href } );

    }
    componentDidMount() {

        linkEventListener.on( "link-complete", this.listener );

    }

    componentWillUnmount() {

        linkEventListener.off( "link-complete", this.listener );

    }

    render() {

        const { url, className = "" } = this.props;
        const map = selectMap( url );
        const { back = [], forward = [], secondary = [] } = map;
        const mapRoute = route => <Link key={ route } to={ route } name={ routingMap[ route ].name }>
        
            { routingMap[ route ].name }
            
        </Link>;
        return <nav className={`routing-nav ${className}`}>

            {back.length ? <div className="routing-nav-backwards">

                {back.map( mapRoute )}

            </div> : null}
            <h1>{map.name}</h1>
            {forward.length ? <div className="routing-nav-forwards">

                {forward.map( mapRoute )}

            </div> : null}
            {secondary.length ? <div className="routing-nav-secondary">

                {secondary.map( mapRoute )}

            </div> : null}

        </nav>;

    }

}

export class Router extends Component {

    constructor() {

        super();
        this.listener = this.listener.bind( this );

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

    componentDidMount() {

        linkEventListener.on( "link", this.listener );
        window.addEventListener( "popstate", this.listener );

    }

    componentWillUnmount() {

        linkEventListener.off( "link", this.listener );
        window.removeEventListener( "popstate", this.listener );

    }

    render() {

        const Component = selectRoute( this.props );
        return <Component nav={ nav } />;

    }

}