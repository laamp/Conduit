import { connect } from 'react-redux';
import { fetchUsersProjects } from '../../actions/projectsActions';
import { logout } from '../../actions/sessionActions';

import NavBar from './navBar';

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    projects: state.entities.projects
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchUsersProjects: userId => dispatch(fetchUsersProjects(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
