import React from "react";
import { Menu } from "tc2-react-good-bad-tracker";
import "./Goals.css";
import MaybeSaver from "../MaybeSaver";
import MaybeLoading from "../MaybeLoading";

const template = [
    
    { prop: "goal", editable: { type: "text", label: "Goal" } },
    { prop: "notes", editable: { type: "textarea", label: "Notes" } },
    { prop: "measurement", editable: { type: "text", label: "Measurement" } },
    { prop: "upScore", editable: { type: "numeric", label: "Points won" } },
    { prop: "downScore", editable: { type: "numeric", label: "Points lost" } }

];

const texts = {
    
    choose: "Edit",
    save: "Ok",
    done: "Cancel"
    
};

const PreLoadedGoals =

    () =>
    
        <div>
        
            ...
            
        </div>;
        
const LoadedGoals =

    props =>
    
        <div>

            <MaybeSaver onSave={props.onSaveAll} isDirty={props.isDirty} />
            {!props.items.length && <p>
            
                You haven't defined any goals yet. Add a new goal using the button below:
                
            </p>}
            <button onClick={props.onAdd}>Add a new goal</button>
            <Menu editable {...props} {...{ template, texts }}/>
            
        </div>;
        
const Goals = 

    props =>
    
        <MaybeLoading className="goals" loading={props.isLoading}>
        
            <p>This list of goals represents a prioritised list of behaviours which you as a team want to change. You can allocate points scored for achieving or missing goals. Goals which offer the potential for the largest change in scores rise to the top of the list. Deprioritise goals by lowering the score.</p>
            {props.isLoaded ? <LoadedGoals {...props} /> : <PreLoadedGoals {...props} />} 
        
        </MaybeLoading>;
        
export default Goals;
