import axios from 'axios';

export const getProjectTasks = projectId => (
    axios.get(`/api/tasks/project/${projectId}`)
);

export const getInboxTasks = userId => (
    axios.get(`/api/tasks/inbox/${userId}`)
);
