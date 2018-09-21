import React from "react";
import MaybeLoading from "../MaybeLoading";
import "./Record.css";
import format from "date-fns/format";
import GoalMenu from "./GoalMenu";
import { Scoring } from "tc2-react-good-bad-tracker";

const Record = 

    ( {
        
        isTeamLoading, isRecordLoading,
        when, working, 
        goals, template, people, 
        onChangeDate, onChangeGoal, 
        onChangeScores, onSaveScores, onCancelScores
        
    } ) =>
    
        <MaybeLoading className="record" loading={isTeamLoading || isRecordLoading}>

            <h3>{format( when, "dddd, MMMM Do, YYYY" )}</h3>
            <p>It's time to look back on how we did.</p>
            <label>

                <span>Assessment date:</span>
                <input type="date" value={when} onChange={ onChangeDate } />
                
            </label>
            <GoalMenu items={goals} chosen={working.goal} template={template} onChange={onChangeGoal} />
            {working.scoringTarget && <section className="scoring">
                <Scoring target={working.scoringTarget} 
                    scorees={people} 
                    handleChange={onChangeScores}
                    selected={working.selectedScores} />
                <button onClick={onSaveScores}>Save</button>
                <button onClick={onCancelScores}>Cancel</button>
            </section>}
            
        </MaybeLoading>;
        
export default Record;
