import { connect } from 'react-redux';
import { logout, setCurrentProject } from '../../actions/sessionActions';
import {
    fetchUsersProjects,
    clearProjects,
    deleteProject
} from '../../actions/projectsActions';
import {
    clearTasks,
    fetchAllTasks
} from '../../actions/tasksActions';

import NavBar from './navBar';

const mapStateToProps = state => ({
    projects: state.entities.projects,
    tasks: state.entities.tasks,
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    currentProjectId: state.session.currentProject
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchUsersProjects: userId => dispatch(fetchUsersProjects(userId)),
    setCurrentProject: project => dispatch(setCurrentProject(project)),
    clearProjects: () => dispatch(clearProjects()),
    clearTasks: () => dispatch(clearTasks()),
    fetchAllTasks: userId => dispatch(fetchAllTasks(userId)),
    deleteProject: projectId => dispatch(deleteProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
