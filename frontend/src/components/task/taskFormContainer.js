import { connect } from 'react-redux';
import TaskForm from './taskForm';
import { createTask } from '../../actions/tasksActions';
import { setCurrentProject } from '../../actions/sessionActions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    createTask: task => dispatch(createTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
