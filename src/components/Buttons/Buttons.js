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
import { Button } from 'react-bootstrap';

export default class Buttons extends React.Component {

  /* Render the component */
  render() {
    return (
      <div className="pull-right">
        <Button bsStyle="success" type="submit" className="btn btn-flat margin">Save</Button>
        <Button bsStyle="danger" className="btn btn-flat margin">Cancel</Button>
      </div>
    );
  }
}