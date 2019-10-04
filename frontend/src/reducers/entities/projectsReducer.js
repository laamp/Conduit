import {
    RECEIVE_USERS_PROJECTS,
    RECEIVE_PROJECT,
    CLEAR_PROJECTS,
    RECEIVE_DELETED_PROJECT
} from '../../actions/projectsActions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USERS_PROJECTS:
            return action.projects.data;
        case RECEIVE_PROJECT:
            return Object.assign({}, state, action.project.data);
        case RECEIVE_DELETED_PROJECT:
            let newState = Object.assign({}, state);
            delete newState[action.projectId.data];
            return newState;
        case CLEAR_PROJECTS:
            return {};
        default:
            return state;
    }
}
