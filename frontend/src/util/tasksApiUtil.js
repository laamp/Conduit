import axios from 'axios';

export const getProjectTasks = projectId => (
    axios.get(`/api/tasks/project/${projectId}`)
);
