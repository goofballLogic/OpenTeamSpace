import { connect } from "react-redux";
import CurrentTeam from "../components/nodes/CurrentTeam";

const mapStateToProps = ( { teams } ) => ( { 
    
    selected: teams.selected
    
} );
const mapDispatchToProps = () => ( { 
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( CurrentTeam );