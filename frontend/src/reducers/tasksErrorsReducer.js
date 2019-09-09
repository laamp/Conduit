import {
    RECEIVE_TASK_ERRORS,
    CLEAR_TASK_ERRORS
} from '../actions/tasksActions';

const _nullErrors = [];

const TaskErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TASK_ERRORS:
            return action.errors;
        case CLEAR_TASK_ERRORS:
            return _nullErrors;
        default:
            return state;
    }
};

export default TaskErrorsReducer;
