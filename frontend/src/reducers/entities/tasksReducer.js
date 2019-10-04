import {
    RECEIVE_PROJECT_TASKS,
    RECEIVE_INBOX_TASKS,
    RECEIVE_NEW_TASK,
    CLEAR_TASKS,
    RECEIVE_ALL_TASKS,
    RECEIVE_CHANGED_TASK,
    RECEIVE_DELETED_TASK
} from '../../actions/tasksActions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_TASKS:
            return action.tasks.data;
        case RECEIVE_INBOX_TASKS:
        case RECEIVE_PROJECT_TASKS:
            return Object.assign({}, state, action.tasks.data);
        case RECEIVE_NEW_TASK:
        case RECEIVE_CHANGED_TASK:
            return Object.assign({}, state, action.task.data);
        case RECEIVE_DELETED_TASK:
            let newState = Object.assign({}, state);
            delete newState[action.taskId.data];
            return newState;
        case CLEAR_TASKS:
            return {};
        default:
            return state;
    }
}
