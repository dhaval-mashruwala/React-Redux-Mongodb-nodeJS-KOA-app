/* Container: Student Details Form Container
 * ============================================================
 * This is container for Student Details Form and passes the data to all the components in tha application
 * =======================================================================================================
 * @author: utsavk1993
 */

/* Import redux components and page components
 * ===========================================
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import View from './View';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
};

let container = connect(mapStateToProps, mapDispatchToProps)(View);

export default container;
