import { connect } from 'react-redux';
import TasksIndex from './tasksIndex';
import { fetchProjectTasks, fetchInboxTasks } from '../../actions/tasksActions';

const mapStateToProps = ({ entities, session }) => ({
    tasks: entities.tasks.tasks,
    inboxTasks: entities.tasks.inboxTasks,
    currentProjectId: session.currentProject
});

const mapDispatchToProps = dispatch => ({
    fetchProjectTasks: projectId => dispatch(fetchProjectTasks(projectId)),
    fetchInboxTasks: userId => dispatch(fetchInboxTasks(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
