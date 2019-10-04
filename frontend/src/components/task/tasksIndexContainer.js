import { connect } from 'react-redux';
import TasksIndex from './tasksIndex';
import { updateTask, deleteTask } from '../../actions/tasksActions';

const mapStateToProps = ({ entities, session }) => ({
    projects: entities.projects,
    tasks: entities.tasks,
    currentProjectId: session.currentProject
});

const mapDispatchToProps = dispatch => ({
    updateTask: task => dispatch(updateTask(task)),
    deleteTask: taskId => dispatch(deleteTask(taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
