import React from "react";
import MaybeLoading from "../MaybeLoading";
import MaybeSaver from "../MaybeSaver";
import { TeamEditor } from "tc2-react-simple-teams";

import "./Users.css";

const Users =

    ( { selected, editable, details, isDirty, handleChange, handleSave, handleArchive } ) =>
    
        <MaybeLoading className="users" loading={selected && ( selected.loading || selected.saving )} text="Hang on - working on it...">
        
            <h1>Users</h1>
            <p className="intro">Well, here you are, {selected.name}. Each team member should have a profile card shown below. If somebody needs to be added, click on an "Empty" card. Or, you can pick an existing card to view/edit the details.</p>
            <MaybeSaver onSave={handleSave} isDirty={isDirty} />
            { editable && <TeamEditor {...editable } onChange={ handleChange } onArchiveProfile={ profile => handleArchive( profile, editable ) } /> }
            
        </MaybeLoading>;
        
export default Users;