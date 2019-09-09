import { combineReducers } from 'redux';

import ProjectErrorsReducer from './projectsErrorsReducer';
import TaskErrorsReducer from './tasksErrorsReducer';
import SessionErrorsReducer from './sessionErrorsReducer';

export default combineReducers({
    projects: ProjectErrorsReducer,
    tasks: TaskErrorsReducer,
    session: SessionErrorsReducer
});
