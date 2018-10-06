import React from "react";


const DateRangeInput =

    ( { name, label, min, max, value, onChange } ) =>

        <label className={ name }>
        
            <span className="label-text">{ label }</span>
            <input type="date" min={ min } max={ max } name={ name } value={ value } onChange={ e => onChange( e.target.value ) } />
        
        </label>;
    
const DateRangeSelect =

    ( { onChange, startMin, startMax, start, endMin, endMax, end } ) =>
    
        <div className="date-range-select">
        
            <DateRangeInput {...start} name="start-date" label="From: " onChange={ value => onChange( value, end ) } />
            <DateRangeInput {...end} name="end-date" label="To: " onChange={ value => onChange( start, value ) } />

        </div>;
        
export default DateRangeSelect;
