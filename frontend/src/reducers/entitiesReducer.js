import { combineReducers } from 'redux';
import projects from './projectsReducer';

const entitiesReducer = combineReducers({
    projects
});

export default entitiesReducer;
