import axios from 'axios';

export const getProjectTasks = projectId => (
    axios.get(`/api/tasks/project/${projectId}`)
);

export const getInboxTasks = userId => (
    axios.get(`/api/tasks/inbox/${userId}`)
);

export const createTask = task => (
    axios.post('/api/tasks', task)
);

export const getUsersTasks = userId => (
    axios.get(`/api/tasks/owner/${userId}`)
);

export const updateTask = task => {
    let taskId = task._id;
    return axios.patch(`/api/tasks/${taskId}`, task);
};
