import { connect } from 'react-redux';
import { fetchUsersProjects, clearProjects } from '../../actions/projectsActions';
import { fetchInboxTasks, clearTasks } from '../../actions/tasksActions';
import { logout, setCurrentProject } from '../../actions/sessionActions';

import NavBar from './navBar';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    currentProject: state.session.currentProject,
    projects: state.entities.projects,
    inboxTasks: state.entities.tasks.inboxTasks
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchUsersProjects: userId => dispatch(fetchUsersProjects(userId)),
    setCurrentProject: project => dispatch(setCurrentProject(project)),
    fetchInboxTasks: userId => dispatch(fetchInboxTasks(userId)),
    clearProjects: () => dispatch(clearProjects()),
    clearTasks: () => dispatch(clearTasks())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
