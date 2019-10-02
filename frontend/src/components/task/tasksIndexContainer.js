import { connect } from 'react-redux';
import TasksIndex from './tasksIndex';
import {
    // fetchProjectTasks,
    // fetchInboxTasks,
    updateTask
} from '../../actions/tasksActions';

const mapStateToProps = ({ entities, session }) => ({
    projects: entities.projects,
    tasks: entities.tasks,
    currentProjectId: session.currentProject
});

const mapDispatchToProps = dispatch => ({
    updateTask: task => dispatch(updateTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
