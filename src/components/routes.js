import React from "react";

import Home from "./Home";
import Teams from "./Teams";
import SelfTest from "./SelfTest";
import Storage from "../containers/Storage";
import AccessDenied from "./AccessDenied";

export const HOME = "/";
export const STORAGE = "/storage";
export const TEAMS = "/teams";
export const CREATE_TEAM = "/teams/create";
export const EDIT_TEAM = "/teams/:teamid";
export const PROGRESS = "/teams/:teamid/progress";
export const USERS = "/teams/:teamid/progress/users";
export const RECORD = "/teams/:teamid/progress/create";
export const GOALS = "/teams/:teamid/progress/create/goals";

export const SELF_TEST = "/self-test";

function requireStorageContext( props ) {
    
    const { context = {} } = props.storage;
    const authorized = context && context.connected;
    return { 
        
        authorized,
        message: "You need to connect to a data store before accessing this page.",
        redirect: STORAGE
        
    };

}

export const map = {

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
        authorize: [ requireStorageContext ],
        back: [ TEAMS ]

    },
    [ EDIT_TEAM ]: {

        name: "Edit team",
        authorize: [ requireStorageContext ],
        back: [ TEAMS, RECORD ]

    },
    [ PROGRESS ]: {

        name: "View progress",
        authorize: [ requireStorageContext ],
        back: [ TEAMS ],
        forward: [ RECORD, USERS ],
        secondary: [ GOALS ]

    },
    [ USERS ]: {

        name: "Edit team users",
        authorize: [ requireStorageContext ],
        back: [ PROGRESS, RECORD ],

    },
    [ RECORD ]: {

        name: "Record an assessment",
        authorize: [ requireStorageContext ],
        back: [ PROGRESS ],
        forward: [ GOALS ],
        secondary: [ USERS ]

    },
    [ GOALS ]: {

        name: "Goals",
        authorize: [ requireStorageContext ],
        back: [ PROGRESS, RECORD ]

    },
    [ SELF_TEST ]: {
        
        name: "Self test",
        component: SelfTest,
        authorize: () => true,
        back: [ HOME ]
        
    }

};

export const UNMATCHED = Symbol( "unmatched route" );

const UnmatchedRouting = {
    
    component: () => () => <div>Not found.</div>
    
};

function findUnauthorized( rules, props ) {
    
    for( const rule of rules ) {
        
        const result = rule( props );
        if ( !result.authorized ) return result;
        
    }
    
}

export function isAuthorized( route, props ) {
    
    const routing = map[ route ] || UnmatchedRouting;
    const rules = routing.authorize || [];
    return !findUnauthorized( rules, props );
    
}

export default function findComponent( route, props ) {
    
    const routing = map[ route ] || UnmatchedRouting;
    const component = routing.component;
    if ( !component ) { throw new Error( `Route has no component: ${route}` ); }
    const rules = routing.authorize || [];
    const denied = findUnauthorized( rules, props );
    return denied
        ? () => <AccessDenied {...denied} />
        : component;

}