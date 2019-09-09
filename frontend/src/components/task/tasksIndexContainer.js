import { connect } from 'react-redux';
import TasksIndex from './tasksIndex';
import { fetchProjectTasks } from '../../actions/tasksActions';

const mapStateToProps = ({ entities }) => ({
    tasks: entities.tasks
});

const mapDispatchToProps = dispatch => ({
    fetchProjectTasks: projectId => dispatch(fetchProjectTasks(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksIndex);
