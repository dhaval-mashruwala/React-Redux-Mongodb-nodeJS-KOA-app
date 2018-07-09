/* The HamburgerMenu container which passes the store data to HamburgerItems component
 * @author: utsavk1993
 */

import { connect } from 'react-redux';

import HamburgerItemsComponent from '../components/HamburgerItems/HamburgerItems';

const mapStateToProps = (state, ownProps) => ({
  hamburgerItems: state.hamburgerItems
});

let HamburgerItems = connect(mapStateToProps)(HamburgerItemsComponent);

export default HamburgerItems;