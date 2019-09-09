import {
    RECEIVE_USERS_PROJECTS,
    CLEAR_PROJECTS
} from '../actions/projectsActions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USERS_PROJECTS:
            let newState = action.projects.data;
            return newState;
        case CLEAR_PROJECTS:
            return {};
        default:
            return state;
    }
}
