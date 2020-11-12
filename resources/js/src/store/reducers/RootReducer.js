import { combineReducers } from 'redux';
import postReducer from './PostReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
   post: postReducer,
   user: userReducer
});

export default rootReducer;
