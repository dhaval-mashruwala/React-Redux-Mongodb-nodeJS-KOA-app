/* Component Name: StudentPersonalDetails
 * ======================================
 * This component will render a form to collect personal details of a student
 * ==========================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Col, ControlLabel, FormControl, FormGroup, Row } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

/* Import Constants and Enums
 * =======================================
 */
import { Constants } from '../../enums/index';
import {lettersOnly,numbersOnly,displayError} from '../../helper';

export default class StudentPersonalDetails extends React.Component {

  /* Initialize the constructor */
  constructor(props) {
    super(props);

    /* Initial state of the component */
    this.state = {
      studentPersonalDetails: {
        address: '',
        cellPhone: '',
        dateOfBirth: new Date(),
        dateOfJoining: new Date(),
        email: '',
        firstName: '',
        gender: '',
        isParent: 'no',
        lastName: '',
        livingWithParents: false,
        studentId: ''
      }
    }
    this.state.studentPersonalDetails = {...this.state.studentPersonalDetails,...props.value};
    this.state.studentPersonalDetails.dateOfBirth = new Date(this.state.studentPersonalDetails.dateOfBirth);
    this.state.studentPersonalDetails.dateOfJoining = new Date(this.state.studentPersonalDetails.dateOfJoining);
  }

  componentWillReceiveProps = (nextProps)=>{
    let {studentPersonalDetails} = this.state;
    studentPersonalDetails = {...studentPersonalDetails,...nextProps.value};
    studentPersonalDetails.dateOfBirth = new Date(studentPersonalDetails.dateOfBirth);
    studentPersonalDetails.dateOfJoining = new Date(studentPersonalDetails.dateOfJoining);

    this.setState({studentPersonalDetails:studentPersonalDetails});
  }

  /* Allow only numeric inputs else show error message */
  _handleNumericInputs(key, e) {
    const regex = /^[0-9\b]+$/;
    const errorElement = e.target.parentElement.querySelector('.help-block');
    const parentElement = e.target.parentElement;

    if (e.target.value === '' || regex.test(e.target.value)) {
      parentElement.classList.remove('has-error');
      errorElement.innerHTML = '';
      errorElement.style = 'display: none';
      this.props.handleStateChange(e, this.state, key);
    } else {
      parentElement.classList.add('has-error');
      errorElement.innerHTML = 'Only Numeric values allowed';
      errorElement.style = 'display: block';
    }
  }


  /* Render the component */
  render() {

    /* Initialize a key which is used to update the state of parent component */
    const key = 'studentPersonalDetails';
    const isViewStudentDetailsPage = this.props.isViewStudentDetailsPage;

    return (
      <Col md={6}>
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title">Personal Details {isViewStudentDetailsPage ? '' : <small>All fields are mandatory</small>}</h3>
          </div>
          <div className="box-body">
            <Row>
              <Col md={4}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Student ID:</label>104838060</span> :
                <FormGroup controlId="studentId">
                  <ControlLabel>Student ID</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.studentPersonalDetails.studentId}
                    placeholder={Constants.placeholders.studentId}
                    autoComplete="false"
                    maxLength="10"
                    onChange={(e)=>{
                      this._handleNumericInputs.call(this, key,e);
                      this.props.setValidity({isIDValid:displayError.call(this,e,e.currentTarget.value)});
                    }} />
                    <span className="help-block"></span>
                </FormGroup>
              }
              </Col>
              <Col md={4}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">DOJ:</label>2018/01/30</span> :
                <FormGroup controlId="dateOfJoining">
                  <ControlLabel>Date of Joining</ControlLabel>
                  <DatePicker
                    className="form-control"
                    value={this.state.studentPersonalDetails.dateOfJoining}
                    onChange={(date) => this.props.handleDateChange(date, this.state, key, 'dateOfJoining')} />
                </FormGroup>
              }
              </Col>
              <Col md={4}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">DOB:</label>1993/01/06</span> :
                <FormGroup controlId="dateOfBirth">
                  <ControlLabel>Date of Birth</ControlLabel>
                  <DatePicker
                    className="form-control"
                    maxDate={new Date()}
                    value={this.state.studentPersonalDetails.dateOfBirth}
                    onChange={(date) => this.props.handleDateChange(date, this.state, key, 'dateOfBirth')} />
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">First Name:</label>Utsav</span> :
                <FormGroup controlId="firstName">
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.studentPersonalDetails.firstName}
                    placeholder={Constants.placeholders.firstName}
                    autoComplete="false"
                    onKeyPress={lettersOnly.bind(this)}
                    onChange={(e) => {
                      this.props.handleStateChange(e, this.state, key);
                      this.props.setValidity({isFirstNameValid:displayError.call(this,e,e.currentTarget.value)})
                    }} />
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Last Name:</label>Kumar</span> :
                <FormGroup controlId="lastName">
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl type="text"
                    value={this.state.studentPersonalDetails.lastName}
                    placeholder={Constants.placeholders.lastName}
                    autoComplete="false"
                    onKeyPress={lettersOnly.bind(this)}
                    onChange={(e) => {
                      this.props.handleStateChange(e, this.state, key);
                      this.props.setValidity({isLastNameValid:displayError.call(this,e,e.currentTarget.value)});
                    }} />
                </FormGroup>
              }
              </Col>
            </Row>
            <Row>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Cell Phone:</label>519-965-5896</span> :
                <FormGroup controlId="cellPhone">
                  <ControlLabel>Cell Phone</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.studentPersonalDetails.cellPhone}
                    placeholder={Constants.placeholders.cellPhone}
                    autoComplete="false"
                    maxLength="10"
                    onKeyPress={numbersOnly.bind(this)}
                    onChange={(e)=>{
                      this._handleNumericInputs.call(this, key,e);
                      this.props.setValidity({isPhoneValid:displayError.call(this,e,e.currentTarget.value.length == 10)});
                    }} />
                    <span className="help-block"></span>
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Email:</label>utsavkumar.ca@gmail.com</span> :
                <FormGroup controlId="email">
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    type="email"
                    value={this.state.studentPersonalDetails.email}
                    placeholder={Constants.placeholders.emailId}
                    autoComplete="false"
                    onChange={(e) => {
                      this.props.handleStateChange(e, this.state, key);
                      this.props.setValidity({isEmailValid:displayError.call(this,e,Constants.EMAILREGEX.test(e.currentTarget.value))});
                    }} />
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Gender:</label>Male</span> :
                <FormGroup controlId="gender">
                  <ControlLabel>Gender</ControlLabel>
                  <FormControl componentClass="select"
                    value={this.state.studentPersonalDetails.gender}
                    onChange={(e) => this.props.handleStateChange(e, this.state, key)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </FormControl>
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Is Student a Parent?</label>No</span> :
                <FormGroup controlId="isParent">
                  <ControlLabel>Is Student a Parent?</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={this.state.studentPersonalDetails.isParent}
                    onChange={(e) => this.props.handleStateChange(e, this.state, key)}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </FormControl>
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Address:</label>2, 1370 Wyandotte Street West, Windsor N9B 1H2, Ontario</span> :
                <FormGroup controlId="address">
                  <ControlLabel>Address</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={this.state.studentPersonalDetails.address}
                    placeholder={Constants.placeholders.address}
                    autoComplete="false"
                    onChange={(e) => {
                      this.props.handleStateChange(e, this.state, key);
                      this.props.setValidity({isAddressValid:displayError.call(this,e,e.currentTarget.value)});
                    }} />
                </FormGroup>
              }
              </Col>
              <Col md={6}>
              {
                isViewStudentDetailsPage ?
                <span><label className="student-detail">Is student living with parents?</label>Yes</span> :
                <FormGroup controlId="livingWithParents">
                  <ControlLabel>Is student living with parents?</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={this.state.studentPersonalDetails.livingWithParents}
                    onChange={(e) => this.props.handleStateChange(e, this.state, key)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </FormControl>
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
