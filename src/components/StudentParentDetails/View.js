/* Component Name: StudentParentDetails
 * ======================================
 * This page will render a form which will ask family details of the student
 * ===========================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Col, ControlLabel, FormControl, FormGroup, Row } from 'react-bootstrap';

/* Import Constants and Enums
 * =======================================
 */
import { Constants } from '../../enums/index';
import {lettersOnly,numbersOnly,displayError} from '../../helper';

export default class StudentParentDetails extends React.Component {

  /* Initialize the constructor */
  constructor(props) {
    super(props);

    /* Initial state of the component */
    this.state = {
      studentParentDetails: {
        parentsName: '',
        parentsEmail: '',
        parentsCellPhone: '',
        parent: 'father'
      }
    }
    this.state.studentParentDetails = {
      ...this.state.studentParentDetails,
      ...props.value
    }
  }

  componentWillReceiveProps = (nextProps)=>{
    let {studentParentDetails} = this.state;
    studentParentDetails = {...studentParentDetails,...nextProps.value};

    this.setState({studentParentDetails:studentParentDetails});
  }

  /* Render the component */
  render() {

    /* Initialize a key which is used to update the state of parent component */
    let key = 'studentParentDetails';
    const isViewStudentDetailsPage = this.props.isViewStudentDetailsPage;

    return (
      <Col md={6}>
        <div className="box box-info">
          <div className="box-header with-border">
            <h3 className="box-title">Parent Details {isViewStudentDetailsPage ? '' : <small>All fields are mandatory</small>}</h3>
          </div>
          <div className="box-body">
            <Row>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Parent:</label>Father</span> :
                <FormGroup controlId="parent">
                  <ControlLabel>Parent</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={this.state.studentParentDetails.parent}
                    onChange={(e) => this.props.handleStateChange(e, this.state, key)}>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                  </FormControl>
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Parent`s Name:</label>Satish Kumar</span> :
                <FormGroup controlId="parentsName">
                  <ControlLabel>Parents`s Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.studentParentDetails.parentsName}
                    placeholder={Constants.placeholders.parentsName}
                    onKeyPress={lettersOnly.bind(this)}
                    autoComplete="false"
                    onChange={(e) => {
                      this.props.handleStateChange(e, this.state, key);
                      this.props.setValidity({isParentNameValid:displayError.call(this,e,e.currentTarget.value)})
                    }} />
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Parent`s Email:</label>satishk@gmail.com</span> :
                <FormGroup controlId="parentsEmail">
                  <ControlLabel>Parent`s Email</ControlLabel>
                  <FormControl
                    type="email"
                    value={this.state.studentParentDetails.parentsEmail}
                    placeholder={Constants.placeholders.parentsEmail}
                    autoComplete="false"
                    onChange={(e) => {
                      this.props.handleStateChange(e, this.state, key);
                      this.props.setValidity({isParentEmailValid:displayError.call(this,e,Constants.EMAILREGEX.test(e.currentTarget.value))})
                    }} />
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Parent`s Cell Phone:</label>519-965-5896</span> :
                <FormGroup controlId="parentsCellPhone">
                  <ControlLabel>Cell Phone</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.studentParentDetails.parentsCellPhone}
                    placeholder={Constants.placeholders.parentsCellPhone}
                    maxLength="10"
                    onKeyPress={numbersOnly.bind(this)}
                    autoComplete="false"
                    onChange={(e) => {
                      this.props.handleStateChange(e, this.state, key);
                      this.props.setValidity({isParentNumberValid:displayError.call(this,e,e.currentTarget.value.length == 10)});
                    }} />
                </FormGroup>
              }
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }
}
