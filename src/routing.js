import React, { Component } from "react";
import EventListener from "EventEmitter";

import "./routing.css";
import routes, { map as routingMap, HOME } from "./routes";

const { location, history, URL } = global;
const linkEventListener = new EventListener();

const locationView = ( url = new URL( location ) ) =>
    url.searchParams.get( "view" )
    || HOME;

const selectRoute = url =>
    routes[ locationView( url ) ]
    || (() => <div>Not found</div>);

const selectMap = url =>
    routingMap[ locationView( url ) ]
    || {};

const ANIMATE_DURATION = 1;

function nav( href ) {

    history.pushState( null, null, href );
    linkEventListener.emit( "link" );

}

function reNav( e ) {

    e.preventDefault();
    nav( e.target.href );

}
export const Link = ( { to, children } ) =>

    <a onClick={e => reNav( e )} href={`?view=${to}`} className="routing-link">{children}</a>;

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

        return <nav className={`routing-nav ${className}`}>

            {back.length ? <div className="routing-nav-backwards">

                {back.map( route => <Link key={ route } to={ route }>{ routingMap[ route ].name }</Link> )}

            </div> : null}
            <h1>{map.name}</h1>
            {forward.length ? <div className="routing-nav-forwards">

                {forward.map( route => <Link key={ route } to={ route }>{ routingMap[ route ].name }</Link> )}

            </div> : null}
            {secondary.length ? <div className="routing-nav-secondary">

                {secondary.map( route => <Link key={ route } to={ route }>{ routingMap[ route ].name }</Link> )}

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

        const Component = selectRoute();
        return <Component />;

    }

}