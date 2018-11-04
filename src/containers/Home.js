import { connect } from "react-redux";
import { STORAGE } from "../components/routes";
import Home from "../components/nodes/Home";

const dialogParentOf = x => x.parentElement && ( x.parentElement.tagName === "DIALOG" ? x.parentElement : dialogParentOf( x.parentElement ) );
const mapStateToProps = ( { storage } ) => ( { storageContext: storage.context } );
const mapDispatchToProps = ( dispatch, { nav } ) => ( { 

    onCloseGettingStarted: e => {

        dialogParentOf( e.target ).close();
        nav( STORAGE );
        
    },
    onDismissGettingStarted: e => {

        document.cookie = "gettingStartedStatus=dismissed";
        dialogParentOf( e.target ).close();

    },
    showGettingStarted: ( storageContext, ref ) => {

        if ( storageContext && storageContext.connected ) return;
        if ( document.cookie.includes( "gettingStartedStatus=dismissed" ) ) return;   
        setTimeout( () => ref && !ref.open && ref.showModal(), 500 );

    }
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( Home );