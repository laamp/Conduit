import * as APIUtil from '../util/tasksApiUtil';

export const RECEIVE_PROJECT_TASKS = 'RECEIVE_PROJECT_TASKS';
export const RECEIVE_INBOX_TASKS = 'RECEIVE_INBOX_TASKS';
export const RECEIVE_NEW_TASK = 'RECEIVE_NEW_TASK';
export const CLEAR_TASKS = 'CLEAR_TASKS';
export const RECEIVE_TASK_ERRORS = 'RECEIVE_TASK_ERRORS';
export const CLEAR_TASK_ERRORS = 'CLEAR_TASK_ERRORS';
export const RECEIVE_ALL_TASKS = 'RECEIVE_ALL_TASKS';

export const receiveProjectTasks = tasks => ({
    type: RECEIVE_PROJECT_TASKS,
    tasks
});

export const receiveInboxTasks = tasks => ({
    type: RECEIVE_INBOX_TASKS,
    tasks
});

export const receiveNewTask = task => ({
    type: RECEIVE_NEW_TASK,
    task
});

export const clearTasks = () => ({
    type: CLEAR_TASKS
});

export const receiveTaskErrors = errors => ({
    type: RECEIVE_TASK_ERRORS,
    errors
});

export const clearTaskErrors = () => ({
    type: CLEAR_TASK_ERRORS
});

export const receiveAllTasks = tasks => ({
    type: RECEIVE_ALL_TASKS,
    tasks
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

export const createTask = task => dispatch => (
    APIUtil.createTask(task)
        .then(task => dispatch(receiveNewTask(task)))
        .catch(errors => dispatch(receiveTaskErrors(errors)))
);

export const clearErrors = () => dispatch => (
    dispatch(clearTaskErrors())
);

export const fetchAllTasks = userId => dispatch => (
    APIUtil.getUsersTasks(userId)
        .then(tasks => dispatch(receiveAllTasks(tasks)))
        .catch(errors => dispatch(receiveTaskErrors(errors)))
);
