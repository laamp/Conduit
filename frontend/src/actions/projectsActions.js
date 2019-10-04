import * as APIUtil from '../util/projectsApiUtil';

export const RECEIVE_ALL_PROJECTS = 'RECEIVE_ALL_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const RECEIVE_USERS_PROJECTS = 'RECEIVE_USERS_PROJECTS';
export const CLEAR_PROJECTS = 'CLEAR_PROJECTS';
export const RECEIVE_PROJECT_ERRORS = 'RECEIVE_PROJECT_ERRORS';
export const CLEAR_PROJECT_ERRORS = 'CLEAR_PROJECT_ERRORS';
export const RECEIVE_DELETED_PROJECT = 'RECEIVE_DELETED_PROJECT';

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

export const clearProjects = () => ({
    type: CLEAR_PROJECTS
});

export const receiveProjectErrors = errors => ({
    type: RECEIVE_PROJECT_ERRORS,
    errors
});

export const clearProjectErrors = () => ({
    type: CLEAR_PROJECT_ERRORS
});

export const receiveDeletedProject = projectId => ({
    type: RECEIVE_DELETED_PROJECT,
    projectId
});

export const fetchAllProjects = () => dispatch => (
    APIUtil.getAllProjects()
        .then(projects => dispatch(receiveAllProjects(projects)))
        .catch(errors => dispatch(receiveProjectErrors(errors)))
);

export const fetchUsersProjects = userId => dispatch => (
    APIUtil.getUserProjects(userId)
        .then(projects => dispatch(receiveUsersProjects(projects)))
        .catch(errors => dispatch(receiveProjectErrors(errors)))
);

export const fetchProject = projectId => dispatch => (
    APIUtil.getProject(projectId)
        .then(project => dispatch(receiveProject(project)))
        .catch(errors => dispatch(receiveProjectErrors(errors)))
);

export const createProject = project => dispatch => (
    APIUtil.createProject(project)
        .then(project => dispatch(receiveProject(project)))
        .catch(errors => dispatch(receiveProjectErrors(errors)))
);

export const clearErrors = () => dispatch => {
    dispatch(clearProjectErrors());
};

export const deleteProject = projectId => dispatch => (
    APIUtil.deleteProject(projectId)
        .then(projectId => dispatch(receiveDeletedProject(projectId)))
        .catch(errors => dispatch(receiveProjectErrors(errors)))
);
