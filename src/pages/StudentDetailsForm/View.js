/* Page: Student Details Form
 * ============================================================
 * This page will render a form to collect the details of a student.
 * The form is divided into 4 components namely Personal Information, Family Information,
 * Academic Information and Financial Information.
 * =================================================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Row,Alert } from 'react-bootstrap';
import * as services from '../../actions/componentService';
/* Import Components and Containers
 * =======================================
 */
import Header from '../../components/Header/Header';
import Buttons from '../../components/Buttons/Buttons';
import HamburgerMenu from '../../containers/HamburgerMenu';
import StudentPersonalDetails from '../../components/StudentPersonalDetails';
import StudentParentDetails from '../../components/StudentParentDetails';
import StudentAcademicDetails from '../../components/StudentAcademicDetails';
import StudentFinancialDetails from '../../components/StudentFinancialDetails';

/* Import Constants and Enums
 * =======================================
 */
import { Constants } from '../../enums/index';

export default class StudentDetailsForm extends React.Component {

  /* Initialize the constructor */
  constructor(props) {
    super(props);
    /* Initial state of the component */
    this.state = {
      studentAcademicDetails: {
        dateOfProgress: new Date().toString(),
        classEnrollment: 'beginner',
        rank: '10'
      },
      studentParentDetails: {},
      studentFinancialDetails: {},
      studentPersonalDetails: {},
    };
    this.isFormValid = (props.match && props.match.params && props.match.params['studentId'])?true:false,
    this.isParentFormValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isIDValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isFirstNameValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isLastNameValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isEmailValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isPhoneValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isAddressValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isParentNameValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isParentEmailValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isParentNumberValid = (props.match && props.match.params && props.match.params['studentId'])?true:false
    this.isStudentRegistrationPage = this.props.match.path === '/student-registration';
    this.isViewStudentDetailsPage = this.props.match.path === '/view-student/:studentId';
  }

  componentWillMount = async() => {
    if(this.props.match && this.props.match.params && this.props.match.params['studentId']){
      let selectedStudent;
      if(this.props.student.studentList && this.props.student.studentList.length){
        selectedStudent = this.props.student.studentList.find((student)=>student._id == this.props.match.params['studentId']);
      } else {
        let response = await services.getStudentListById(this.props.match.params['studentId']);
        selectedStudent = response.data.data;
        console.log(selectedStudent);
      }
      this.setState({
        studentPersonalDetails:selectedStudent,
        studentParentDetails:selectedStudent.parent,
        studentAcademicDetails:selectedStudent.class,
        studentFinancialDetails:selectedStudent.finance
      });
    }
  }

  /* Set the page title after the component mounts */
  componentDidMount() {
    document.title = this.isStudentRegistrationPage ? Constants.documentTitles.studentRegistration :
    (this.isViewStudentDetailsPage ? Constants.documentTitles.viewStudentDetails : Constants.documentTitles.editStudentDetails);
  }

  /* Remove the page title before the component unmounts */
  componentWillUnmount() {
    document.title = Constants.documentTitles.empty;
  }

  /* Submit the form data to mongo DB */
  _handleFormSubmit = async(e) => {
    let {isFormValid,isParentFormValid} = this.state;
    e.preventDefault();
      this.state.studentPersonalDetails.livingWithParents = (this.state.studentPersonalDetails.livingWithParents && this.state.studentPersonalDetails.livingWithParents!='false')
      this.state.studentPersonalDetails.isParent = this.state.studentPersonalDetails.isParent == 'yes';
      if(this.isFormValid && (!this.state.studentPersonalDetails.livingWithParents || this.isParentFormValid)){
        this.setState({showWarning:false});
      if(this.props.match && this.props.match.params && this.props.match.params['studentId']){
        await this.props.editStudent.call(this,this.state);
      } else {
        await this.props.registerStudent.call(this,this.state);
      }
      this.props.history.push('/student-list');
    } else {
      this.setState({showWarning:true});
    }
  }

  /* Change the state of the component whenever a form element updates */
  _handleStateChange(e, state, key) {
    state[key][e.target.id] = e.target.value;
    this.setState(state);
  }

  setPersonalDetailValidity = (validity)=>{
    this.isIDValid = validity['isIDValid']!=undefined?validity['isIDValid']:this.isIDValid;
    this.isFirstNameValid =  validity['isFirstNameValid']!=undefined?validity['isFirstNameValid']:this.isFirstNameValid;
    this.isLastNameValid = validity['isLastNameValid']!=undefined?validity['isLastNameValid']:this.isLastNameValid ;
    this.isPhoneValid = validity['isPhoneValid']!=undefined?validity['isPhoneValid']:this.isPhoneValid ;
    this.isEmailValid = validity['isEmailValid']!=undefined?validity['isEmailValid']:this.isEmailValid ;
    this.isAddressValid = validity['isAddressValid']!=undefined?validity['isAddressValid']:this.isAddressValid ;
    this.isFormValid = (this.isIDValid && this.isFirstNameValid && this.isLastNameValid && this.isPhoneValid && this.isEmailValid && this.isAddressValid);
  }

  setParentDetailValidity = (validity)=>{
    this.isParentNameValid = validity['isParentNameValid']!=undefined?validity['isParentNameValid']:this.isParentNameValid;
    this.isParentEmailValid =  validity['isParentEmailValid']!=undefined?validity['isParentEmailValid']:this.isParentEmailValid;
    this.isParentNumberValid = validity['isParentNumberValid']!=undefined?validity['isParentNumberValid']:this.isParentNumberValid ;
    this.isParentFormValid = (this.isParentNameValid && this.isParentEmailValid && this.isParentNumberValid);
  }

  /* Change the state of the component whenever a date-picker component updates */
  _handleDateChange(date, state, key, ref) {
    state[key][ref] = date;
    this.setState(state);
  }

  /* Add a new row which indicates item and the cost of item to be purchased by the student
   * and update the state of the component
   */
  _handleCostRow(state) {
    let costRow = { item: 'Membership', itemCost: 200, dateOfPurchase: new Date().toString() };
    state.costs.push(costRow);
    this.setState({studentFinancialDetails: state});
  }

  /* Update the cost field whenever the purchasing item is changed and update the state of the component */
  _handleItemChange(state, index, key, e) {
    let currentRow = state[key].costs[index];
    currentRow[e.target.id] = e.target.value;
    currentRow.itemCost = parseInt(e.target.value, 10);
    this.setState(state);
  }

  _renderWarning = () => {
    let {showWarning} = this.state;
    if(showWarning){
      return (
        <Alert bsStyle="warning">
        <strong>Warning!</strong> Please fill all Required feilds!
      </Alert>
    );
    }

  }

  /* Render the component */
  render() {
    return (
      <div className="student-details">
        <Header />
        <HamburgerMenu />
        <div className="content-wrapper">
          <form method="post" onSubmit={this._handleFormSubmit.bind(this)}>
            <section className="content-header">
              <h1>
                {
                  this.isStudentRegistrationPage ? 'Student Registration' :
                  (this.isViewStudentDetailsPage ? 'View ' : 'Edit ') + 'Student - '
                }
                {this.props.match.params.studentId}<small>@ Big Boss Club Martial Arts School</small>
                <Buttons />
              </h1>
            </section>
            <section className="content">
              {this._renderWarning()}
              <Row>
                <StudentPersonalDetails
                  handleStateChange={this._handleStateChange.bind(this)}
                  value={this.state.studentPersonalDetails}
                  setValidity={this.setPersonalDetailValidity.bind(this)}
                  handleDateChange={this._handleDateChange.bind(this)}
                  isViewStudentDetailsPage = {this.isViewStudentDetailsPage} />
                <StudentParentDetails
                  handleStateChange={this._handleStateChange.bind(this)}
                  value={this.state.studentParentDetails}
                  setValidity={this.setParentDetailValidity.bind(this)}
                  handleDateChange={this._handleDateChange.bind(this)}
                  isViewStudentDetailsPage = {this.isViewStudentDetailsPage} />
                <StudentAcademicDetails
                  value={this.state.studentAcademicDetails}
                  handleStateChange={this._handleStateChange.bind(this)}
                  handleDateChange={this._handleDateChange.bind(this)} />
                <StudentFinancialDetails
                  value={this.state.studentFinancialDetails}
                  handleCostRow={this._handleCostRow.bind(this)}
                  handleItemChange={this._handleItemChange.bind(this)} />
              </Row>
            </section>
          </form>
        </div>
      </div>
    );
  }
}
