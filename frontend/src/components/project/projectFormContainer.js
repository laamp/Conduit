import { connect } from 'react-redux';
import { createProject } from '../../actions/projectsActions';
import { setCurrentProject } from '../../actions/sessionActions';
import ProjectForm from './projectForm';

const mapStateToProps = ({ session }) => ({
    currentUser: session.user
});

const mapDispatchToProps = dispatch => ({
    createNewProject: project => dispatch(createProject(project)),
    setCurrentProject: projectId => dispatch(setCurrentProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
