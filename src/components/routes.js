import React from "react";

import { requireStorageContext, maybeAuthorizeStorageRequirement } from "./routing";

import Home from "./Home";
import Teams from "./Teams";
import SelfTest from "./SelfTest";
import Storage from "../containers/Storage";

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

export const map = {

    [ HOME ]: {

        name: "Home",
        component: Home,
        authorize: ( props ) => {
            
            setTimeout( () => {
                
                requireStorageContext( props );
                
            }, 3000 );
            return true;
            
        },
        forward: [ STORAGE, TEAMS ],

    },
    [ STORAGE ]: {

        name: "Select storage",
        component: Storage,
        authorize: ( props ) => {
            
            maybeAuthorizeStorageRequirement( props );
            return true;
            
        },
        back: [ HOME ]

    },
    [ TEAMS ]: {

        name: "Select team",
        component: Teams,
        back: [ HOME ],
        forward: [ CREATE_TEAM, PROGRESS ]

    },
    [ CREATE_TEAM ]: {

        name: "Create a team",
        back: [ TEAMS ]

    },
    [ EDIT_TEAM ]: {

        name: "Edit team",
        back: [ TEAMS, RECORD ]

    },
    [ PROGRESS ]: {

        name: "View progress",
        back: [ TEAMS ],
        forward: [ RECORD, USERS ],
        secondary: [ GOALS ]

    },
    [ USERS ]: {

        name: "Edit team users",
        back: [ PROGRESS, RECORD ],

    },
    [ RECORD ]: {

        name: "Record an assessment",
        back: [ PROGRESS ],
        forward: [ GOALS ],
        secondary: [ USERS ]

    },
    [ GOALS ]: {

        name: "Goals",
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

export default function RouteComponent( route, props ) {
    
    const routing = map[ route ] || UnmatchedRouting;
    const component = routing.component;
    if ( !component ) { throw new Error( `Route has no component: ${route}` ); }
    const authorize = routing.authorize || requireStorageContext;
    return authorize( props )
        ? component
        : () => <div className="access-denied">Access denied</div>;
    
}