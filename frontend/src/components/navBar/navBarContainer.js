import { connect } from 'react-redux';
import { fetchUsersProjects, clearProjects } from '../../actions/projectsActions';
import { logout, setCurrentProject } from '../../actions/sessionActions';

import NavBar from './navBar';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    projects: state.entities.projects
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchUsersProjects: userId => dispatch(fetchUsersProjects(userId)),
    clearProjects: () => dispatch(clearProjects()),
    setCurrentProject: project => dispatch(setCurrentProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
