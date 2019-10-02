import { connect } from 'react-redux';
import TaskForm from './taskForm';
import { createTask } from '../../actions/tasksActions';

const mapStateToProps = state => ({
    currentProjectId: state.session.currentProject
});

const mapDispatchToProps = dispatch => ({
    createTask: task => dispatch(createTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
