/*global URL*/
import React from "react";

import Home from "./nodes/Home";
import Teams from "../containers/Teams";
import SelfTest from "./nodes/SelfTest";
import Storage from "../containers/Storage";
import AccessDenied from "./nodes/AccessDenied";
import CreateTeam from "../containers/CreateTeam";
import Progress from "../containers/Progress";
import Users from "../containers/Users";

export const HOME = "/";
export const STORAGE = "/storage";
export const TEAMS = "/teams";
export const CREATE_TEAM = "/teams/create";
export const EDIT_TEAM = "/teams/:teamid";
export const PROGRESS = "/teams/:teamid/progress";
const PROGRESS_PATTERN = /^\/teams\/[^/]*\/progress$/;
export const USERS = "/teams/:teamid/progress/users";
const USERS_PATTERN = /^\/teams\/[^/]*\/progress\/users$/;
export const RECORD = "/teams/:teamid/progress/create";
export const GOALS = "/teams/:teamid/progress/create/goals";

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
        forward: [ STORAGE, TEAMS ],

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
        forward: [ CREATE_TEAM, PROGRESS ]

    },
    [ CREATE_TEAM ]: {

        name: "Create a team",
        component: CreateTeam,
        authorize: [ requireStorageContext ],
        back: [ TEAMS ]

    },
    [ EDIT_TEAM ]: {

        name: "Edit team",
        authorize: [ requireStorageContext, requireTeamSelection ],
        back: [ TEAMS, RECORD ]

    },
    [ PROGRESS ]: {

        name: "View progress",
        match: route => PROGRESS_PATTERN.test( route ),
        component: Progress,
        authorize: [ requireStorageContext, requireTeamSelection ],
        back: [ TEAMS ],
        forward: [ RECORD, USERS ],
        secondary: [ GOALS ]

    },
    [ USERS ]: {

        name: "Edit team users",
        match: route => USERS_PATTERN.test( route ),
        component: Users,
        authorize: [ requireStorageContext, requireTeamSelection ],
        back: [ PROGRESS, RECORD ],

    },
    [ RECORD ]: {

        name: "Record an assessment",
        authorize: [ requireStorageContext, requireTeamSelection ],
        back: [ PROGRESS ],
        forward: [ GOALS ],
        secondary: [ USERS ]

    },
    [ GOALS ]: {

        name: "Goals",
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

export const matchRoute = 

    route => 
    
        map[ route ] 
        || Object.values( map ).find( routing => routing.match && routing.match( route ) )
        || UnmatchedRouting;

export default function findComponent( route, props ) {

    const routing = matchRoute( route );
    const component = routing.component;
    if ( !component ) { throw new Error( `Route has no component: ${route}` ); }
    const rules = routing.authorize || [];
    const denied = findUnauthorized( rules, route, props );
    return denied
        ? () => <AccessDenied {...denied} />
        : component;

}