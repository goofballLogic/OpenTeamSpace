import { connect } from "react-redux";
import { Router } from "../components/routing";
const mapStateToProps = ( { storage, teams } ) => ( { 
    
    storage,
    teams
    
} );
const mapDispatchToProps = ( dispatch, { nav } ) => ( {
    

} );
export default connect( mapStateToProps, mapDispatchToProps )( Router );