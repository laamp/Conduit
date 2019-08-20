import * as APIUtil from '../util/projectsApiUtil';

export const RECEIVE_ALL_PROJECTS = 'RECEIVE_ALL_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const RECEIVE_USERS_PROJECTS = 'RECEIVE_USERS_PROJECTS';
export const RECEIVE_PROJECT_ERRORS = 'RECEIVE_PROJECT_ERRORS';

export const receiveAllProjects = projects => ({
    type: RECEIVE_ALL_PROJECTS,
    projects
});

export const receiveProject = project => ({
    type: RECEIVE_PROJECT,
    project
});

export const receiveUsersProjects = projects => ({
    type: RECEIVE_USERS_PROJECTS,
    projects
});

export const receiveProjectErrors = errors => ({
    type: RECEIVE_PROJECT_ERRORS,
    errors
});

export const fetchAllProjects = () => dispatch => (
    APIUtil.getAllProjects()
        .then(projects => dispatch(receiveAllProjects(projects)))
        .catch(errors => dispatch(receiveProjectErrors(errors)))
);
