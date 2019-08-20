import axios from 'axios';

export const getAllProjects = () => {
    return axios.get('/api/projects');
};

export const getProject = id => {
    return axios.get(`/api/projects/${id}`);
};

export const getUserProjects = userId => {
    return axios.get(`/api/projects/user/${userId}`);
};

export const createProject = project => {
    return axios.post('/api/projects', project);
};
