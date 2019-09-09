import {
    RECEIVE_PROJECT_TASKS,
    RECEIVE_INBOX_TASKS
} from '../actions/tasksActions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PROJECT_TASKS:
            return {
                inboxTasks: state.inboxTasks,
                tasks: action.tasks.data
            };
        case RECEIVE_INBOX_TASKS:
            return {
                ...state,
                inboxTasks: action.tasks.data
            };
        default:
            return state;
    }
}
