/* The main index file which combines all the reducer into a single reducer
 * ========================================================================
 * @author: utsavk1993
 */

/* Import combineReducer method from redux */
import {combineReducers} from 'redux';

/* Import all reducers */
import HamburgerItems from './HamburgerItems';
import FormActions from './FormActions';
import student from './student';

/* Combine all reducers into a single reducer */
const allReducers = combineReducers({
  hamburgerItems: HamburgerItems,
  formActions: FormActions,
  student:student
});

export default allReducers;
