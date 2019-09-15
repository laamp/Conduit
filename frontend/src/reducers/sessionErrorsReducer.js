import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_USER_SIGN_IN,
    CLEAR_SESSION_ERRORS
} from '../actions/sessionActions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_USER_SIGN_IN:
        case CLEAR_SESSION_ERRORS:
            return _nullErrors;
        default:
            return state;
    }
};

export default SessionErrorsReducer;
