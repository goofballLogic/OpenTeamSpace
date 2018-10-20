import React from "react";
import MaybeLoading from "../MaybeLoading";
import "./Record.css";
import format from "date-fns/format";
import GoalMenu from "./GoalMenu";
import { Scoring } from "tc2-react-good-bad-tracker";
import { GOALS } from "../routes";
import { Link } from "../routing"; 


const NoGoals =

    () =>
    
        <div>
            
            <p>No goals found. You can create some: <Link to={ GOALS }>Set some goals</Link></p>
                
        </div>;
        
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
            { !( isTeamLoading || isRecordLoading ) && ( !goals.length ) && <NoGoals /> }
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
