/* Component Name: StudentAcademicDetails
 * ======================================
 * This component will render two dropdowns which will ask class level and initial rank of the student
 * =====================================================================================================
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

export default class StudentAcademicDetails extends React.Component {

  /* Initialize the constructor */
  constructor(props) {
    super(props);

    /* Initial state of the component */
    this.state = {
      studentAcademicDetails: {
        dateOfProgress: new Date().toString(),
        classEnrollment: 'beginner',
        rank: '10'
      }
    }
    this.state.studentAcademicDetails = {
      ...this.state.studentAcademicDetails,
      ...props.value
    }
  }

  componentWillReceiveProps = (nextProps)=>{
    let {studentAcademicDetails} = this.state;
    studentAcademicDetails = {
      ...studentAcademicDetails,...nextProps.value
    };

    this.setState({studentAcademicDetails:studentAcademicDetails});
  }

  /* Render the component */
  render() {

    /* Initialize a key which is used to update the state of parent component */
    let key = 'studentAcademicDetails';

    return (
      <Col md={6}>
        <div className="box box-success">
          <div className="box-header with-border">
            <h3 className="box-title">Academic Information <small>All fields are mandatory</small></h3>
          </div>
          <div className="box-body">
            <Row>
              <Col md={6}>
                <FormGroup controlId="classEnrollment">
                  <ControlLabel>Class Enrollment</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={this.state.studentAcademicDetails.classEnrollment}
                    onChange={(e) => this.props.handleStateChange(e, this.state, key)}>
                    {
                      Constants.classLevels.map((level, index) =>
                        <option value={level.value} key={index}>{level.name}</option>
                      )
                    }
                  </FormControl>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup controlId="rank">
                  <ControlLabel>Rank</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={this.state.studentAcademicDetails.rank}
                    onChange={(e) => this.props.handleStateChange(e, this.state, key)}>
                    {
                      Constants.ranks.map((rank, index) =>
                        <option value={rank.value} key={index}>{rank.name}</option>
                      )
                    }
                  </FormControl>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup controlId="dateOfProgress">
                  <ControlLabel>Date of Progress</ControlLabel>
                  <div>{this.state.studentAcademicDetails.dateOfProgress}</div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }
}
