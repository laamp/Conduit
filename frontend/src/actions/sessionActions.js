import * as APIUtil from '../util/sessionApiUtil';
import jwt_decode from 'jwt-decode';

export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';

export const receiveUserSignIn = currentUser => ({
    type: RECEIVE_USER_SIGN_IN,
    currentUser
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
});

export const receiveCurrentProject = projectId => ({
    type: SET_CURRENT_PROJECT,
    projectId
});

export const setCurrentProject = projectId => dispatch => {
    localStorage.setItem('currentProject', projectId);
    dispatch(receiveCurrentProject(projectId));
};

export const signup = user => dispatch => (
    APIUtil.signup(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveUserSignIn(decoded));
    }).catch(err => dispatch(receiveErrors(err.response.data)))
);

export const login = user => dispatch => (
    APIUtil.login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveUserSignIn(decoded));
    }).catch(err => dispatch(receiveErrors(err.response.data)))
);

export const guestLogin = () => dispatch => (
    APIUtil.guestLogin().then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveUserSignIn(decoded));
    }).catch(err => {
        dispatch(receiveErrors(err.response.data));
    })
);

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentProject');
    APIUtil.setAuthToken(false);
    dispatch(logoutUser());
};

export const clearErrors = () => dispatch => {
    dispatch(clearSessionErrors());
};
