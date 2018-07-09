/* Component: Buttons
 * ======================================================
 * This component will render navigation items in sidebar
 * ======================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class HamburgerItems extends React.Component {

  /* Render the component */
  render() {

    /* Iterate through the menu items and display them in sidebar */
    const HamburgerItemsInstance = (
      this.props.hamburgerItems.map((item) =>
        <LinkContainer exact to={item.url} key={item.eventKey}>
          <NavItem eventKey={item.eventKey} title={item.name}>
            <i className={item.iconClass}></i>
            <span>{item.name}</span>
          </NavItem>
        </LinkContainer>
      )
    );

    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <span className="header">MAIN NAVIGATION</span>
          <Nav className="sidebar-menu">
            { HamburgerItemsInstance }
          </Nav>
        </section>
      </aside>
    );
  }
}