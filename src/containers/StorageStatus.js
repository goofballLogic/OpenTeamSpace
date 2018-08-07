import { connect } from "react-redux";
import { StorageStatus } from "tc2-react-simple-storage";
const mapStateToProps = ( { storage } ) => ( { context: storage.context } );
const mapDispatchToProps = () => ({});
export default connect( mapStateToProps, mapDispatchToProps )( StorageStatus );