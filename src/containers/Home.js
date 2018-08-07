import { connect } from "react-redux";
import Home from "../components/Home";
import { requireStorage } from "../actions/storage";

const mapStateToProps = ( { storage } ) => ( { storageContext: storage.context } );
const mapDispatchToProps = ( dispatch, { nav } ) => ( { 
    
    requireStorage: storageContext => requireStorage( { nav, storageContext } )
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( Home );