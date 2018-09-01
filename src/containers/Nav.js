import { connect } from "react-redux";
import { Nav } from "../components/routing";
const mapStateToProps = state => state;
const mapDispatchToProps = ( dispatch, { nav } ) => ( {
    

} );
export default connect( mapStateToProps, mapDispatchToProps )( Nav );