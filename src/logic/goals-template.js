
export default [
    
    { 
        prop: "goal",
        editable: { type: "text", label: "Goal" } 
    },
    {
        prop: "rationale",
        editable: { type: "textarea", label: "Rationale" }
    },
    {
        prop: "measurement",
        editable: { type: "text", label: "Measurement" }
    },
    { 
        prop: "upScore",
        className: "score {key} {truthiness}", 
        editable: { type: "numeric", label: "Points won" } 
    },
    {
        prop: "downScore",
        className: "score {key} {truthiness}",
        editable: { type: "numeric", label: "Points lost" }
    }

];