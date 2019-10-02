import { connect } from 'react-redux';
import TaskForm from './taskForm';
import { createTask } from '../../actions/tasksActions';
import { fetchProject, fetchUsersProjects } from '../../actions/projectsActions';

const mapStateToProps = state => ({
    currentUserId: state.session.user.id,
    currentProjectId: state.session.currentProject
});

const mapDispatchToProps = dispatch => ({
    createTask: task => dispatch(createTask(task)),
    fetchProject: projectId => dispatch(fetchProject(projectId)),
    fetchUsersProjects: id => dispatch(fetchUsersProjects(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
