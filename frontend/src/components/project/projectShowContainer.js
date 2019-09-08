import { connect } from 'react-redux';
import ProjectShow from './projectShow';

const mapStateToProps = ({ entities, session }) => ({
    projects: entities.projects,
    currentProject: session.currentProject
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectShow);
