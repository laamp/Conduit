import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common.Authorization = token;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};

export const signup = userData => {
    return axios.post('/api/users/signup', userData);
};

export const login = userData => {
    return axios.post('/api/users/login', userData);
};

export const guestLogin = () => {
    const guestInfo = {
        email: 'guest@conduit.com',
        password: 'hunter12'
    };

    return axios.post('/api/users/login', guestInfo);
};

export const oauthSignin = idToken => {
    return axios.post('api/users/oauth', idToken);
};
