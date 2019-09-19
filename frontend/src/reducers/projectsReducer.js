import {
    RECEIVE_USERS_PROJECTS,
    RECEIVE_PROJECT,
    CLEAR_PROJECTS
} from '../actions/projectsActions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USERS_PROJECTS:
            let newState = action.projects.data;
            return newState;
        case RECEIVE_PROJECT:
            return Object.assign({}, state, action.project.data);
        case CLEAR_PROJECTS:
            return {};
        default:
            return state;
    }
}
