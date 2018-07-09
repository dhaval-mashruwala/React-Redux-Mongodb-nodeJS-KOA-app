/* Page: Record Attendance
 * ============================================================
 * This page will record attendance of a student in particular class on a spedific date.
 * ====================================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Button, Col, ControlLabel, FormControl, FormGroup, Row } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import * as services from '../../actions/componentService';
/* Import Components and Containers
 * =======================================
 */
import Buttons from '../../components/Buttons/Buttons';
import Header from '../../components/Header/Header';
import HamburgerMenu from '../../containers/HamburgerMenu';

/* Import Constants and Enums
 * =======================================
 */
import { Constants } from '../../enums/index';

export default class RecordAttendance extends React.Component {

  /* Initialize the constructor */
  constructor(props) {
    super(props);

    /* Initial state of the component */
    this.state = {
      attendanceDetails: [],
      classEnrollment: 'beginner',
      date: new Date(),
      enrolledStudentList:[]
    }
  }

  /* Set the page title after the component mounts */
  componentDidMount() {
    document.title = Constants.documentTitles.recordAttendance;
  }

  /* Remove the page title before the component mounts */
  componentWillUnMount() {
    document.title = Constants.documentTitles.empty;
  }

  /* Submit the form data to mongo DB */
  _handleFormSubmit = async(e) => {
    e.preventDefault();
    let data = Object.keys(this.state.attendanceDetails).map((studentID)=>{
      let obj={};
      obj.student = this.state.attendanceDetails[studentID]._id;
      obj.present = this.state.attendanceDetails[studentID].present;
      obj.classEnrollment = this.state.attendanceDetails[studentID].class[this.state.attendanceDetails[studentID].class.length - 1].classEnrollment;
      obj.date = this.state.date;
      return obj
    })
    await this.props.recordAttendance.call(this,data);
    this.props.history.push('/student-list');
  }

  /* Get list of all the students enrolled in a specific class */
  _getStudentDetails = async() => {
    let {attendanceDetails} = this.state;
    let response = await services.getStudentListByClass(this.state.classEnrollment);
    let enrolledStudentList = response.data.data;
    enrolledStudentList.forEach((student)=>{
      this.state.attendanceDetails[student._id] = student;
      this.state.attendanceDetails[student._id].present = true;
    });
    this.setState({enrolledStudentList});
  }

  /* Record attendance of all students and update the state of component */
  _handleAttendanceStatus(enrolledStudent,e) {
    if(enrolledStudent && enrolledStudent._id){
      this.state.attendanceDetails[enrolledStudent._id] = enrolledStudent;
      this.state.attendanceDetails[enrolledStudent._id].present = e.currentTarget.value === 'present';
    }
    console.log(this.state.attendanceDetails);
  }

_renderStudentList = ()=>{
  let {enrolledStudentList} = this.state;
  if(enrolledStudentList.length){
    return(enrolledStudentList.map((enrolledStudent)=>{
      return(<tr key={enrolledStudent._id}>
        <td>{enrolledStudent._id}</td>
        <td>{enrolledStudent.firstName+' '+enrolledStudent.lastName}</td>
        <td>{enrolledStudent.class[enrolledStudent.class.length - 1].classEnrollment}</td>
        <td>
          <FormGroup controlId="isParent">
            <FormControl componentClass="select"
              onChange={this._handleAttendanceStatus.bind(this,enrolledStudent)}>
              {
                Constants.attendanceValues.map((attendance, index) =>
                  <option value={attendance.value} key={index}>{attendance.name}</option>
                )
              }
            </FormControl>
          </FormGroup>
        </td>
      </tr>);
    })
  );
  } else {
    return(<tr><td>No student enrolled!</td></tr>);
  }

}

  render() {
    return (
      <div className="record-attendance">
        <Header />
        <HamburgerMenu />
        <div className="content-wrapper">
          <form method="post" onSubmit={this._handleFormSubmit.bind(this)}>
            <section className="content-header">
              <h1>Record Student Attendance<small>Mark student absent/present</small>
                <Buttons />
              </h1>
            </section>
            <section className="content">
              <Row>
                <Col md={12}>
                  <div className="box box-warning">
                    <div className="box-header with-border">
                      <h3 className="box-title">Select Attendance Date and Class Level</h3>
                    </div>
                    <div className="box-body">
                      <Row>
                        <Col md={6}>
                          <FormGroup controlId="attendanceDate">
                            <ControlLabel>Attendance Date</ControlLabel>
                            <DatePicker className="form-control" value={this.state.date} onChange={(date) => {this.setState({date: date})}} />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup controlId="classEnrollment">
                            <ControlLabel>Class Enrollment</ControlLabel>
                            <FormControl
                              componentClass="select"
                              onChange={(e) => this.setState({classEnrollment: e.target.value})}>
                              {
                                Constants.classLevels.map((level, index) =>
                                  <option value={level.value} key={index}>{level.name}</option>
                                )
                              }
                            </FormControl>
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <Button className="btn btn-flat bg-maroon go-btn" onClick={this._getStudentDetails.bind(this)}>GO</Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">List of Students Enrolled</h3>
                    </div>
                    <div className="box-body table-responsive no-padding">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Class</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this._renderStudentList()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
          </form>
        </div>
      </div>
    );
  }

}
