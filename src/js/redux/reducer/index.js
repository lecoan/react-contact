import {combineReducers} from 'redux';
import user from './user';
import contact from './contacts'


const rootReducer = combineReducers({
  user,
  contact
});

export default rootReducer;