import { combineReducers } from 'redux';
import projects from './projectsReducer';
import tasks from './tasksReducer';

const entitiesReducer = combineReducers({
    projects,
    tasks
});

export default entitiesReducer;
