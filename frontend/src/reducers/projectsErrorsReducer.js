import {
    RECEIVE_PROJECT_ERRORS,
    CLEAR_PROJECT_ERRORS
} from '../actions/projectsActions';

const _nullErrors = [];

const ProjectErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PROJECT_ERRORS:
            return action.errors;
        case CLEAR_PROJECT_ERRORS:
            return _nullErrors;
        default:
            return state;
    }
};

export default ProjectErrorsReducer;
