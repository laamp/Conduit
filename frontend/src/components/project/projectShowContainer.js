import { connect } from 'react-redux';
import { setCurrentProject } from '../../actions/sessionActions';
import ProjectShow from './projectShow';

const mapStateToProps = ({ entities, session }) => ({
    projects: entities.projects,
    currentProject: session.currentProject,
    inboxTasks: entities.tasks.inboxTasks
});

const mapDispatchToProps = dispatch => ({
    setCurrentProject: projectId => dispatch(setCurrentProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectShow);
