/*global URL*/
import React from "react";

import Home from "./nodes/Home";
import Teams from "../containers/Teams";
import SelfTest from "./nodes/SelfTest";
import Storage from "../containers/Storage";
import AccessDenied from "./nodes/AccessDenied";
import CreateTeam from "../containers/CreateTeam";
import EditTeam from "../containers/EditTeam";
import Progress from "../containers/Progress";
import Users from "../containers/Users";
import Record from "../containers/Record";
import Goals from "../containers/Goals";

export const HOME = "/";
export const STORAGE = "/storage";
export const TEAMS = "/teams";
export const CREATE_TEAM = "/teams/create";
export const EDIT_TEAM = "/teams/:teamid";
const EDIT_TEAM_PATTERN = /^\/teams\/([^/]*)$/;
export const PROGRESS = "/teams/:teamid/progress";
const PROGRESS_PATTERN = /^\/teams\/([^/]*)\/progress$/;
export const USERS = "/teams/:teamid/progress/users";
const USERS_PATTERN = /^\/teams\/([^/]*)\/progress\/users$/;
export const RECORD = "/teams/:teamid/progress/create/:when";
const RECORD_PATTERN = /^\/teams\/([^/]*)\/progress\/create\/(\d{4}-\d{2}-\d{2})$/;
export const GOALS = "/teams/:teamid/progress/create/goals";
const GOALS_PATTERN = /^\/teams\/([^/]*)\/progress\/create\/goals$/;

export const SELF_TEST = "/self-test";

function requireStorageContext( route, props ) {
    
    const { context = {} } = props.storage;
    const authorized = context && context.connected;
    return { 
        
        authorized,
        message: "You need to connect to a data store before accessing this page.",
        redirect: STORAGE,
        redirectFrom: route
        
    };

}

function requireTeamSelection( route, props ) {
    
    const { selected } = props.teams;
    if ( !selected ) {
        
        return {
        
            authorized: false,
            message: "You need to choose a team before accessing this page.",
            redirect: TEAMS,
            redirectFrom: route
            
        };
        
    }
    const pathTeamId = route && route.split( "/" )[ 2 ];
    if ( pathTeamId && selected.id !== pathTeamId ) {
        
        return {
            
            authorized: false,
            message: "You don't have access to the team you've attempted to access.",
            redirect: TEAMS
            
        };
        
    }
    return {
        
        authorized: true
        
    };
    
}

const map = {

    [ HOME ]: {

        name: "Home",
        component: Home,
        forward: [ STORAGE, TEAMS, PROGRESS ],

    },
    [ STORAGE ]: {

        name: "Select storage",
        component: Storage,
        back: [ HOME ]

    },
    [ TEAMS ]: {

        name: "Select team",
        component: Teams,
        authorize: [ requireStorageContext ],
        back: [ HOME ],
        forward: [ CREATE_TEAM, PROGRESS, EDIT_TEAM ],
        secondary: [ GOALS, STORAGE ]

    },
    [ CREATE_TEAM ]: {

        name: "Create a team",
        component: CreateTeam,
        authorize: [ requireStorageContext ],
        back: [ TEAMS ]

    },
    [ EDIT_TEAM ]: {

        name: "Edit team",
        component: EditTeam,
        match: route => EDIT_TEAM_PATTERN.exec( route ),
        authorize: [ requireStorageContext, requireTeamSelection ],
        back: [ TEAMS, RECORD ]

    },
    [ PROGRESS ]: {

        name: "View progress",
        match: route => PROGRESS_PATTERN.exec( route ),
        component: Progress,
        authorize: [ requireStorageContext, requireTeamSelection ],
        back: [ TEAMS, EDIT_TEAM ],
        forward: [ RECORD, USERS ],
        secondary: [ GOALS ]

    },
    [ USERS ]: {

        name: "Edit team users",
        match: route => USERS_PATTERN.exec( route ),
        component: Users,
        authorize: [ requireStorageContext, requireTeamSelection ],
        back: [ PROGRESS, RECORD ],

    },
    [ RECORD ]: {

        name: "Record an assessment",
        match: route => RECORD_PATTERN.exec( route ),
        component: Record,
        authorize: [ requireStorageContext, requireTeamSelection ],
        back: [ PROGRESS ],
        forward: [ GOALS ],
        secondary: [ USERS ]

    },
    [ GOALS ]: {

        name: "Goals",
        match: route => GOALS_PATTERN.exec( route ),
        component: Goals,
        authorize: [ requireStorageContext, requireTeamSelection ],
        back: [ PROGRESS, RECORD ]

    },
    [ SELF_TEST ]: {
        
        name: "Self test",
        component: SelfTest,
        authorize: [],
        back: [ HOME ]
        
    }

};

export const UNMATCHED = Symbol( "unmatched route" );

const UnmatchedRouting = {
    
    component: () => <div>Not found.</div>
    
};

function findUnauthorized( rules, route, props ) {
    
    for( const rule of rules ) {
        
        const result = rule( route, props );
        if ( !result.authorized ) return result;
        
    }

}

export function isAuthorized( route, props ) {
    
    const routing = map[ route ] || UnmatchedRouting;
    const rules = routing.authorize || [];
    return !findUnauthorized( rules, null, props );
    
}

export function matchRoute( route ) {
    
    if ( map[ route ] ) return map[ route ];
    for( var routing of Object.values( map ).filter( r => r.match ) ) {
        
        var matched = routing.match( route );
        if ( matched ) {
            
            return {
                
                ...routing,
                params: matched.slice( 1 )
                
            };
            
        }
        
    }
    return UnmatchedRouting;
    
}

export default function findComponent( route, props ) {

    const routing = matchRoute( route );
    const RouteComponent = routing.component;
    if ( !RouteComponent ) { throw new Error( `Route has no component: ${route}` ); }
    const rules = routing.authorize || [];
    const denied = findUnauthorized( rules, route, props );
    return denied
        ? { ...routing, component: () => <AccessDenied {...denied} /> }
        : routing;

}