import {
    RECEIVE_PROJECT_TASKS,
    RECEIVE_INBOX_TASKS,
    CLEAR_TASKS
} from '../actions/tasksActions';

const initialState = {
    tasks: {},
    inboxTasks: {}
};

export default function (state = initialState, action) {
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
        case CLEAR_TASKS:
            return initialState;
        default:
            return state;
    }
}
