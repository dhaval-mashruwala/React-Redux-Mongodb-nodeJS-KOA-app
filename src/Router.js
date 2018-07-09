/* The main router which helps in navigating through the application
 * =================================================================
 * @author: utsavk1993
 */

/* Import React and other React components
 * =======================================
 */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

/* Import components and containers
 * =======================================
 */
import Login from './pages/Login/Login';
import RecordAttendance from './pages/RecordAttendance';
import StudentDetailsForm from './pages/StudentDetailsForm';
import StudentList from './pages/StudentList';
import TrackStudentDetails from './pages/TrackStudentDetails';
import TrackStudentParents from './pages/TrackStudentParents';

/* Configure routes of the application */
const Routes = () => (
  <div className="App">
    <Switch>
    	<Route exact path='/edit-student/:studentId' component={ StudentDetailsForm } />
      <Route exact path='/login' component={ Login } />
      <Route exact path='/record-attendance' component={ RecordAttendance } />
      <Route exact path='/student-list' component={ StudentList } />
      <Route exact path='/student-registration' component={ StudentDetailsForm } />
      <Route exact path='/track-student-attendance' component={ TrackStudentDetails } />
      <Route exact path='/track-student-finance' component={ TrackStudentDetails } />
      <Route exact path='/track-student-parents' component={ TrackStudentParents } />
      <Route exact path='/view-student/:studentId' component={ StudentDetailsForm } />
      <Redirect from="/" to="/student-list" />
    </Switch>
  </div>
)

export default Routes;
