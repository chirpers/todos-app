import { combineReducers } from 'redux';

import user from './user';
import todos from './todos';
import messages from './messages';

const reducers = combineReducers({
  user,
  todos,
  messages
});

export default reducers;
