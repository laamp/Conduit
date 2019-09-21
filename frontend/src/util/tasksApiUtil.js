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

export const moveTask = blob => (
    axios.patch('/api/tasks/move', blob)
);
