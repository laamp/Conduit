import { connect } from 'react-redux';
import { setCurrentProject } from '../../actions/sessionActions';
import ProjectShow from './projectShow';

const mapStateToProps = ({ entities, session }) => ({
    projects: entities.projects,
    tasks: entities.tasks,
    currentProject: session.currentProject
});

const mapDispatchToProps = dispatch => ({
    setCurrentProject: projectId => dispatch(setCurrentProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectShow);
