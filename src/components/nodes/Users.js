import React from "react";
import Team from "./Team";
import MaybeLoading from "../MaybeLoading";
import { TeamEditor } from "tc2-react-simple-teams";

import "./Users.css";

const Users =

    ( { selected, editable, details, isDirty, handleChange, handleSave } ) =>
    
        <MaybeLoading className="users" loading={selected && ( selected.loading || selected.saving )} text="Hang on - working on it...">
        
            <h1>Users</h1>
            <p className="intro">Well, here you are, {selected.name}. Each team member should have a profile card shown below. If somebody needs to be added, click on an "Empty" card. Or, you can pick an existing card to view/edit the details.</p>
            <form className="save-changes" onSubmit={ handleSave }>
            
                <button className={isDirty ? "urgent" : ""}>Save</button>
                
            </form>
            <Team {...selected} />
            { editable && <TeamEditor {...editable } onChange={ handleChange } /> }
            
        </MaybeLoading>;
        
export default Users;