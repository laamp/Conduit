import * as APIUtil from '../util/tasksApiUtil';

export const RECEIVE_PROJECT_TASKS = 'RECEIVE_PROJECT_TASKS';
export const RECEIVE_INBOX_TASKS = 'RECEIVE_INBOX_TASKS';
export const RECEIVE_TASK_ERRORS = 'RECEIVE_TASK_ERRORS';
export const CLEAR_TASK_ERRORS = 'CLEAR_TASK_ERRORS';

export const receiveProjectTasks = tasks => ({
    type: RECEIVE_PROJECT_TASKS,
    tasks
});

export const receiveInboxTasks = tasks => ({
    type: RECEIVE_INBOX_TASKS,
    tasks
});

export const receiveTaskErrors = errors => ({
    type: RECEIVE_TASK_ERRORS,
    errors
});

export const clearTaskErrors = () => ({
    type: CLEAR_TASK_ERRORS
});

export const fetchProjectTasks = projectId => dispatch => (
    APIUtil.getProjectTasks(projectId)
        .then(tasks => dispatch(receiveProjectTasks(tasks)))
        .catch(errors => dispatch(receiveTaskErrors(errors)))
);

export const fetchInboxTasks = userId => dispatch => (
    APIUtil.getInboxTasks(userId)
        .then(tasks => dispatch(receiveInboxTasks(tasks)))
        .catch(errors => dispatch(receiveTaskErrors(errors)))
);

export const clearErrors = () => dispatch => (
    dispatch(clearTaskErrors())
);
