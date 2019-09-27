import { connect } from 'react-redux';
import TasksIndex from './tasksIndex';
import {
    fetchProjectTasks,
    fetchInboxTasks,
    updateTask
} from '../../actions/tasksActions';

const mapStateToProps = ({ entities, session }) => ({
    tasks: entities.tasks.tasks,
    inboxTasks: entities.tasks.inboxTasks,
    currentProjectId: session.currentProject,
    currentUserId: session.user.id,
    projects: entities.projects
});

const mapDispatchToProps = dispatch => ({
    fetchProjectTasks: projectId => dispatch(fetchProjectTasks(projectId)),
    fetchInboxTasks: userId => dispatch(fetchInboxTasks(userId)),
    updateTask: task => dispatch(updateTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
