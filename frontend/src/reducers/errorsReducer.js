import { combineReducers } from 'redux';

import ProjectErrorsReducer from './projectsErrorsReducer';
import SessionErrorsReducer from './sessionErrorsReducer';

export default combineReducers({
    projects: ProjectErrorsReducer,
    session: SessionErrorsReducer
});
