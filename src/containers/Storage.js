import { connect } from "react-redux";
import Storage from "../components/Storage";
import { resetContext, changeContext } from "../actions/storage";
const mapStateToProps = ( { storage } ) => ( { 
    
    storageContext: storage.context
    
} );
const mapDispatchToProps = ( dispatch, { nav } ) => ( {
    
    changeContext: changes => dispatch( changeContext( changes ) ),
    handleError: err => dispatch( resetContext( { err } ) )
    
} );
export default connect( mapStateToProps, mapDispatchToProps )( Storage );