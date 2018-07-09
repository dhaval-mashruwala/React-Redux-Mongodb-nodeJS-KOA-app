/* Page: Login
 * Provides access to the application. Acts as an auth-gateway
 * ==========================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Col, FormControl, FormGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Import images
 * =======================================
 */
import logo from '../../assets/img/logo.png';

/* Import Constants and Enums
 * =======================================
 */
import { Constants } from '../../enums/index';

export default class Login extends React.Component {

  /* Add a class before login component mounts */
  componentDidMount(e) {
    document.body.classList.add('login-page');
    document.title = Constants.documentTitles.login;
  }

  /* Remove the class before login component unmounts */
  componentWillUnmount(e) {
    document.body.classList.remove('login-page');
    document.title = Constants.documentTitles.empty;
  }

  /* Set the focus on form element when the page loads */
  _focusInput(component) {
    if(component) {
      ReactDOM.findDOMNode(component).focus();
    }
  }

  /* Render the component */
  render() {

    const PATHNAME = this.props.location.pathname;

    return (
      <div className="login-box">
        <div className="login-logo">
          <Link to={PATHNAME} title="Big Boss Club"><img src={logo} alt="BBC Logo" /></Link>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form action="" method="post">
            <FormGroup className="has-feedback">
              <FormControl type="email" placeholder="Email" ref={this._focusInput.bind(this)}/>
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </FormGroup>
            <FormGroup className="has-feedback">
              <FormControl type="password" placeholder="Password" />
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </FormGroup>
            <Row>
              <Col xs={4}>
                <Button bsStyle="primary">Sign In</Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    );

  }

}