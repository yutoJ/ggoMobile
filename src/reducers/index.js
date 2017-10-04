
import { combineReducers } from 'redux';

import nav from './nav';
import user from './user';
import gadget from './gadget';

export default combineReducers({
  nav,
  user,
  gadget,
});
