import React from "react";
import Team from "./Team";
import MaybeLoading from "../MaybeLoading";

import "./Users.css";

const Users =

    ( { selected } ) =>
    
        <MaybeLoading className="users" loading={selected && selected.loading}>
        
            <h1>Users</h1>
            <Team {...selected} />
            
        </MaybeLoading>;
        
export default Users;