import Progress from "../components/nodes/Progress";
import { connect } from "react-redux";

const mapStateToProps = ( { teams } ) => ( { 
    
    selected: teams.selected
    
} );

const mapDispatchToProps = ( dispatch ) => ( {
    
} );


export default connect( mapStateToProps, mapDispatchToProps )( Progress );