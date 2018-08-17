import { connect } from "react-redux";
import { Nav } from "../components/routing";
const mapStateToProps = ( { storage } ) => ( { 
    
    storage
    
} );
const mapDispatchToProps = ( dispatch, { nav } ) => ( {
    

} );
export default connect( mapStateToProps, mapDispatchToProps )( Nav );