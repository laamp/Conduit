import { combineReducers } from 'redux';

import SessionErrorsReducer from './sessionErrorsReducer.js';

export default combineReducers({
    session: SessionErrorsReducer
});
