import Users from "../components/nodes/Users";
import { connect } from "react-redux";

const mapStateToProps = ( { teams } ) => ( { 
    
    selected: teams.selected
    
} );

const mapDispatchToProps = ( dispatch ) => ( {
    
} );


export default connect( mapStateToProps, mapDispatchToProps )( Users );