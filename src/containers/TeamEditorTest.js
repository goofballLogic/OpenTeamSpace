import { connect } from "react-redux";
import { TeamEditor } from "tc2-react-simple-teams/dist/dev";
import { updateTeamDetails } from "../actions/testing";

const mapStateToProps = ( { testing } ) => testing;
const mapDispatchToProps = dispatch => ( { 
    
    onChange: details => dispatch( updateTeamDetails( details ) )
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( TeamEditor );