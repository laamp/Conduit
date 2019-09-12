import {
    RECEIVE_USER_LOGOUT,
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_SIGN_IN,
    SET_CURRENT_PROJECT
} from '../actions/sessionActions';

const initialState = {
    isAuthenticated: false,
    isSignedIn: false,
    user: null,
    currentProject: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.currentUser,
                user: action.currentUser,
                currentProject: null
            };
        case RECEIVE_USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true,
                currentProject: null
            };
        case RECEIVE_USER_LOGOUT:
            return initialState;
        case SET_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: action.projectId
            };
        default:
            return state;
    }
}
