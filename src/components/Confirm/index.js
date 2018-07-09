/* Component: Buttons
 * ============================================================
 * This component will render buttons to save, edit and cancel the forms
 * ======================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Button,Modal } from 'react-bootstrap';

export default class Confirm extends React.Component {

  /* Render the component */
  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.props.body}</Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.noHandler.bind(this)}>{this.props.no}</Button>
            <Button bsStyle="primary" onClick={this.props.yesHandler.bind(this)}>{this.props.yes}</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}
