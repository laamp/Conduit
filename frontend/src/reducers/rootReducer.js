import { combineReducers } from 'redux';
import entities from './entities/entitiesReducer';
import session from './sessionReducer';
import errors from './errors/errorsReducer';

const RootReducer = combineReducers({
    entities,
    session,
    errors
});

export default RootReducer;
