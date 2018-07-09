/* Page: Track Student Details
 * ============================================================
 * This page will give the track of all the expenses of a student within a specific date range
 * and the attendance of the students
 * ===========================================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Button, Col, ControlLabel, FormControl, FormGroup, Row, Table } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import * as componentService from '../../actions/componentService';
/* Import Components and Containers
 * =======================================
 */
import Header from '../../components/Header/Header';
import HamburgerMenu from '../../containers/HamburgerMenu';

/* Import Constants and Enums
 * =======================================
 */
import { Constants } from '../../enums/index';

export default class TrackStudentDetails extends React.Component {

  /* Initialize the constructor */
  constructor(props) {
    super(props);

    /* Initial state of the component */
    this.state = {
      fromDate: new Date(),
      studentId: '',
      toDate: new Date(),
      attendanceRecord:[],
      financeRecord:[]
    }

    this.isTrackStudentAttendance = this.props.match.path === '/track-student-attendance';
  }

  /* Set the page title after the component mounts */
  componentDidMount() {
    document.title = this.isTrackStudentAttendance ? Constants.documentTitles.trackStudentAttendance : Constants.documentTitles.trackStudentFinance;
  }

  /* Remove the page title before the component mounts */
  componentWillUnmount() {
    document.title = Constants.documentTitles.empty;
  }

  componentWillReceiveProps(newProps) {
    this.isTrackStudentAttendance = newProps.match.path === '/track-student-attendance';
  }

  /* Get the finances of the student from mongo DB */
  _getStudentFinances = async (e) => {
    e.preventDefault();
    if(this.isTrackStudentAttendance){
      let response = await componentService.getAttendanceDetail.call(this,this.state);
      this.setState({attendanceRecord:(response.data.data && response.data.data.length)?response.data.data:[]});
    } else {
      let response = await componentService.getFinanceDetail.call(this,this.state);
      this.setState({financeRecord:(response.data.data && response.data.data.length)?response.data.data:[]});
    }

  }

  render() {
    return (
      <div className="track-student-details">
        <Header />
        <HamburgerMenu />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>Track Student {this.isTrackStudentAttendance ? 'Attendance' : 'Finance'}
            <small>Get the details of a student in a date range</small></h1>
          </section>
          <section className="content">
            <Row>
              <Col md={12}>
                <div className="box box-warning">
                  <div className="box-header with-border">
                    <h3 className="box-title">Enter Student ID and Select From and To Dates</h3>
                  </div>
                  <div className="box-body">
                    <Row>
                      <Col md={4}>
                        <FormGroup controlId="studentId">
                          <ControlLabel>Enter the Student ID</ControlLabel>
                          <FormControl
                            type="text"
                            value={this.state.studentId}
                            placeholder={Constants.placeholders.studentId}
                            autoComplete="false"
                            onChange={(e) => this.setState({studentId: e.target.value})} />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup controlId="fromDate">
                          <ControlLabel>From Date</ControlLabel>
                          <DatePicker
                            className="form-control"
                            value={this.state.fromDate}
                            onChange={(date) => {this.setState({fromDate: date})}} />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup controlId="toDate">
                          <ControlLabel>To Date</ControlLabel>
                          <DatePicker
                            className="form-control"
                            value={this.state.toDate}
                            onChange={(date) => {this.setState({toDate: date})}} />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <Button className="btn btn-flat bg-maroon go-btn" onClick={this._getStudentFinances.bind(this)}>GO</Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <div className="box box-info">
                  <div className="box-header with-border">
                    <h3 className="box-title">{this.isTrackStudentAttendance ? 'Attendance Records' : 'List of Expenses'}</h3>
                  </div>
                  <div className="box-body table-responsive no-padding">
                  {
                    this.isTrackStudentAttendance ?
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Student ID</th>
                          <th>Name</th>
                          <th>Date</th>
                          <th>Attendance Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.attendanceRecord.length?(this.state.attendanceRecord.map((record)=>
                          <tr>
                            <td>{record.student.studentId}</td>
                            <td>{record.student.firstName+' '+record.student.lastName}</td>
                            <td>{new Date(record.date)+''}</td>
                            <td>{record.present?'Present':'Absent'}</td>
                          </tr>)):(
                          <tr>No Data found!</tr>
                        )}
                      </tbody>

                    </Table> :
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Cost</th>
                          <th>Date of Purchase</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.financeRecord.length?(this.state.financeRecord.map((record)=>
                          <tr>
                            <td>{record.item}</td>
                            <td>{record.itemCost}</td>
                            <td>{new Date(record.date)+''}</td>
                          </tr>)):(
                          <tr>No Data found!</tr>
                        )}
                      </tbody>
                    </Table>
                  }
                  </div>
                </div>
              </Col>
            </Row>
          </section>
        </div>
      </div>
    );
  }

}
