import {
    RECEIVE_USER_LOGOUT,
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_SIGN_IN,
    SET_CURRENT_PROJECT
} from '../actions/sessionActions';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.currentUser,
                user: action.currentUser
            };
        case RECEIVE_USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true
            };
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        case SET_CURRENT_PROJECT:
            let newState = Object.assign({}, state);
            newState.currentProject = action.project;
            return newState;
        default:
            return state;
    }
}
