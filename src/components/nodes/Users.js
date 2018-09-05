import React from "react";
import Team from "./Team";

import "./Users.css";

const Users =

    ( { selected } ) =>
    
        <article className="users">
        
            <h1>Users</h1>
            <Team {...selected} />
            
        </article>;
        
export default Users;