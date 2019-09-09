import { RECEIVE_PROJECT_TASKS } from '../actions/tasksActions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PROJECT_TASKS:
            return action.tasks.data;
        default:
            return state;
    }
}
