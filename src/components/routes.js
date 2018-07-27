import React from "react";
import Home from "./Home";
import Teams from "./Teams";
import SelfTest from "./SelfTest";

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
        forward: [ STORAGE, TEAMS ],

    },
    [ STORAGE ]: {

        name: "Select storage",
        back: [ HOME ]

    },
    [ TEAMS ]: {

        name: "Select team",
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
        back: [ HOME ]
        
    }

};

export const UNMATCHED = Symbol( "unmatched route" );

export default {

    [ HOME ]: Home,
    [ TEAMS ]: Teams,
    [ SELF_TEST ]: SelfTest,
    [ UNMATCHED ]: () => <div>Not found.</div>

}