import { connect } from "react-redux";
import { populate, create } from "../actions/team";
import CreateTeam from "../components/nodes/CreateTeam";

const mapStateToProps = ( { createTeam } ) => ( { 
    
    ...createTeam
    
} );
const mapDispatchToProps = ( dispatch, { nav } ) => ( {
    
    populate: props => dispatch( populate( props ) ),
    create: () => dispatch( create() )
    
} );

export default connect( mapStateToProps, mapDispatchToProps )( CreateTeam );

if ( module.hot ) module.hot.accept();