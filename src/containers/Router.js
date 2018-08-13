import { connect } from "react-redux";
import { Router } from "../components/routing";
const mapStateToProps = ( { storage } ) => ( { 
    
    storage
    
} );
const mapDispatchToProps = ( dispatch, { nav } ) => ( {
    

} );
export default connect( mapStateToProps, mapDispatchToProps )( Router );