import axios from 'axios';

export const getProjectTasks = projectId => (
    axios.get(`/api/tasks/project/${projectId}`)
);
// TODO: make sure tasks come back in the proper format
