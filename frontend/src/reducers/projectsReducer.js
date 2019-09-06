import {
    RECEIVE_USERS_PROJECTS
} from '../actions/projectsActions';

export default function (state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USERS_PROJECTS:
            let newState = action.projects.data;
            return newState;
        default:
            return state;
    }
}
