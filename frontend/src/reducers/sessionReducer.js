import {
    RECEIVE_USER_LOGOUT,
    RECEIVE_USER_SIGN_IN,
    SET_CURRENT_PROJECT
} from '../actions/sessionActions';

const initialState = {
    isAuthenticated: false,
    isSignedIn: false,
    user: null,
    currentProject: 'inbox'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USER_SIGN_IN:
            return {
                currentProject: 'inbox',
                user: action.currentUser,
                isAuthenticated: !!action.currentUser,
                isSignedIn: !!action.currentUser
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
