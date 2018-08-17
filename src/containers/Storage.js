import { connect } from "react-redux";
import Storage from "../components/Storage";
import { resetContext, changeContext } from "../actions/storage";

const mapStateToProps = ( { storage } ) => ( { context: storage.context } );

const mapDispatchToProps = ( dispatch, { nav } ) => ( {
    
    changeContext: changes => dispatch( changeContext( changes ) ),
    handleError: err => dispatch( resetContext( { err } ) ),
    cancelContext: () => dispatch( resetContext() )
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( Storage );