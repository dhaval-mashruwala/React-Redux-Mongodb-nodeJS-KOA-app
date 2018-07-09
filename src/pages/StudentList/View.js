/* Page: Student List
 * ============================================================
 * This page will display the list of all students who are registered in Big Boss Club.
 * ===================================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Col, FormControl, InputGroup, Row, Table,ButtonToolbar,ToggleButtonGroup,ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

/* Import Components and Containers
 * =======================================
 */
import Header from '../../components/Header/Header';
import Confirm from '../../components/Confirm';
import HamburgerMenu from '../../containers/HamburgerMenu';

/* Import Constants and Enums
 * =======================================
 */
import { Constants } from '../../enums/index';

export default class StudentList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      studentList:[],
      confirm:{
        showConfirm:false,
        title:'Delete Student!',
        body:'Are you sure you want to delete student?',
        yesHandler:()=>{},
        noHandler:()=>{this.setState({confirm:{...this.state.confirm,showConfirm:false}})},
        yesText:'YES',
        noText:'NO'
      },
      searchQuery:'',
      LivingWithParentFilter:[0,1],
      parentAsStudentFilter:[0,1]
    };
  }
  componentWillMount = () => {
    this.props.getStudentList.call(this);
  }

  /* Set the page title before component mounts */
  componentDidMount() {
    document.title = Constants.documentTitles.studentDetails;
  }

  componentWillReceiveProps = (nextProp) => {
    let {studentList} = this.state;
    console.log(nextProp.student);
    if(nextProp.student.studentList){
      this.setState({studentList:nextProp.student.studentList});
    }
  }

  /* Remove the page title before component unmounts */
  componentWillUnmount() {
    document.title = Constants.documentTitles.empty;
  }

  confirmStudentDelete = (id,event)=>{
    this.setState({confirm:{
      ...this.state.confirm,
      showConfirm:true,
      yesHandler:()=>{
        this.props.deleteStudent.call(this,id);
        this.setState({confirm:{
          ...this.state.confirm,
          showConfirm:false
        }});
      }
   }});
  }

  _renderTableRow = () => {
    let {studentList} = this.state;
    if(studentList.length){
      return studentList.map((student, index)=><tr key={index}>
        <td><Link to={'/view-student/'+student._id} title="View Student Details">{student._id}</Link></td>
        <td>{student.firstName + ' '+ student.lastName}</td>
        <td>{moment(student.dateOfBirth).format('YYYY/MM/DD')}</td>
        <td>{moment(student.dateOfJoining).format('YYYY/MM/DD')}</td>
        <td>{student.cellPhone}</td>
        <td>{student.email}</td>
        <td>{student.address}</td>
        <td>{student.parent?student.parent.parentsCellPhone:' - '}</td>
        <td>
          <Link to={'/edit-student/'+student._id} title="Edit Student Details"><i className="fa fa-edit"></i></Link>
          <a title="Delete Student" onClick={this.confirmStudentDelete.bind(this,student._id)} ><i className="fa fa-close"></i></a>
        </td>
      </tr>)
    }

    return (
      <tr><td>No student Details found.</td></tr>
    )
  }

  localSearchStudent = (arg)=>{
    let {student:{studentList}} = this.props;
    let {searchQuery} = this.state;
    let {parentAsStudentFilter,LivingWithParentFilter} = arg;
    if(studentList.length){
      let filteredStudentList = studentList.filter((item)=>{
        for(let key in item){
          if((typeof item[key] == 'string' && item[key].indexOf(searchQuery)!=-1) || !searchQuery){
            if((LivingWithParentFilter.length == 2 || LivingWithParentFilter.length == 0) &&(parentAsStudentFilter.length == 2 || parentAsStudentFilter.length == 0)){
              return item;
            } else if(LivingWithParentFilter.length == 1 && parentAsStudentFilter.length == 1){
              return (item.livingWithParents == LivingWithParentFilter[0] && item.isParent == parentAsStudentFilter[0] && item);
            } else if(LivingWithParentFilter.length == 1){
              return item.livingWithParents == LivingWithParentFilter[0] && item;
            } else if(parentAsStudentFilter.length == 1){
              return item.isParent == parentAsStudentFilter[0] && item;
            }

          }
        }
      });
      this.setState({studentList:filteredStudentList});
    }
  }

  _renderConfirm = ()=>{
    let {showConfirm,title,body,yesHandler,noHandler,yesText,noText} = this.state.confirm;
    if(showConfirm){
      return (
        <Confirm
          title = {title}
          body = {body}
          yesHandler = {yesHandler}
          noHandler = {noHandler}
          yes = {yesText}
          no = {noText}

        ></Confirm>
      );
    } else {
      return null;
    }

  }

  render() {

    return (
      <div className="student-list-wrapper">
        {this._renderConfirm()}
        <Header />
        <HamburgerMenu />
        <div className="content-wrapper">
          <section className="content-header">
            <h1>List of Students<small>@ Big Boss Club Martial Arts School</small></h1>
          </section>
          <section className="content">
            <Row>
              <Col md={12}>
                <div className="box box-danger">
                  <div className="box-header">
                    <div className="disp-inline m-r-5">
                      <span className="m-r-5x">Living with parent?</span>
                      <div className="disp-inline">
                        <ButtonToolbar>
                        <ToggleButtonGroup type="checkbox" name="livingWithParent"  onChange={(values)=>{this.setState({LivingWithParentFilter:values});this.localSearchStudent({LivingWithParentFilter:values,parentAsStudentFilter:this.state.parentAsStudentFilter})}} value={this.state.LivingWithParentFilter} defaultValue={[0,1]}>
                          <ToggleButton value={1}>Yes</ToggleButton>
                          <ToggleButton value={0}>No</ToggleButton>
                        </ToggleButtonGroup>
                      </ButtonToolbar>
                      </div>
                  </div>

                  <div className="disp-inline m-r-5">
                    <span className="m-r-5x">Student as parent?</span>
                    <div className="disp-inline">
                      <ButtonToolbar>
                      <ToggleButtonGroup type="checkbox" name="studentAsParent" onChange={(values)=>{this.setState({parentAsStudentFilter:values});this.localSearchStudent({parentAsStudentFilter:values,LivingWithParentFilter:this.state.LivingWithParentFilter})}} value={this.state.parentAsStudentFilter} defaultValue={[0,1]}>
                        <ToggleButton value={1}>Yes</ToggleButton>
                        <ToggleButton value={0}>No</ToggleButton>
                      </ToggleButtonGroup>
                    </ButtonToolbar>
                    </div>
                </div>

                    <div className="box-tools">
                      <InputGroup className="input-group-sm search-box">
                        <FormControl style={{padding: '17px'}} value={this.state.searchQuery} onChange={(e)=>this.setState({searchQuery:e.currentTarget.value})} type="search" className="pull-right" placeholder={Constants.placeholders.search} />
                        <InputGroup.Addon onClick={()=>this.localSearchStudent({LivingWithParentFilter:this.state.LivingWithParentFilter,parentAsStudentFilter:this.state.parentAsStudentFilter})}><i className="fa fa-search"></i></InputGroup.Addon>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="box-body table-responsive no-padding">
                  <Table responsive hover className="student-list">
                    <tbody>
                      <tr>
                        <th>SID</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Date of Joining</th>
                        <th>Cell</th>
                        <th>Email</th>
                        <th className="address">Address</th>
                        <th>Parent`s Cell</th>
                        <th>Action</th>
                      </tr>
                      {this._renderTableRow()}
                    </tbody>
                  </Table>
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
