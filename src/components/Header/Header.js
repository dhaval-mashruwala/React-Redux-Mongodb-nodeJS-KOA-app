/* Component: Header
 * ======================================================
 * This component will render header of the application
 * ======================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class Header extends React.Component {

  /* Render the component */
  render() {

    return (
      <header className="main-header">
        <Link to='/dashboard' className="logo">
          <span className="logo-mini"><b>BBC</b></span>
          <span className="logo-lg"><b>Big Boss </b>Club</span>
        </Link>
        <nav className="navbar navbar-static-top">
          <Button bsStyle="default" title="Logout" className="pull-right logout-btn">Utsav Kumar<i className="fa fa-power-off"></i></Button>
        </nav>
      </header>
    );
  }
}