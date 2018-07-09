/* One big constant which contains various constant objects to be consumed by application components
 * =================================================================================================
 * @author: utsavk1993
 */

export const Constants = {

  /* Constants for attendance values of a student */
  attendanceValues: [
    { name: 'Present', value: 'present'},
    { name: 'Absent', value: 'absent'}
  ],

  /* Constants for class levels of a student */
  classLevels: [
    { name: 'Beginner (Monday 6:00 PM)', value: 'beginner'},
    { name: 'Intermediate (Tuesday 5:00 PM)', value: 'intermediate'},
    { name: 'Advanced (Wednesday 5:00 PM)', value: 'advanced'}
  ],

  /* Constants for title tag of pages */
  documentTitles: {
    empty: '',
    login: 'Login | Big Boss Club',
    studentDetails: 'List of Students | Big Boss Club',
    studentRegistration: 'Student Registration | Big Boss Club',
    editStudentDetails: 'Edit Student Details | Big Boss Club',
    recordAttendance: 'Record Attendance | Big Boss Club',
    viewStudentDetails: 'View Student Details | Big Boss Club',
    trackStudentAttendance: 'Track Student Attendance | Big Boss Club',
    trackStudentFinance: 'Track Student Finance | Big Boss Club',
    trackStudentParents: 'Track Student Parents | Big Boss Club'
  },

  /* Constants for placeholder for form elements */
  placeholders: {
    address: 'Present home address of the student',
    cellPhone: 'Cell number of the student',
    costOfItem: 'Cost of the item',
    emailId: 'Email ID of the student',
    firstName: 'First name of the student',
    lastName: 'Last name of the student',
    parentsCellPhone: 'Cell number of the parent',
    parentsName: 'Full Name of the parent',
    parentsEmail: 'Email ID of the parent',
    search: 'Search',
    studentId: 'Unique Student ID'
  },

  /* Constants for items that can be purchased by the student */
  purchasingItems: [
    { cost: 200, name: 'Membership'},
    { cost: 75, name: 'Basic Level Test'},
    { cost: 110, name: 'Intermediate Level Test'},
    { cost: 150, name: 'Advanced Level Test'},
    { cost: 40, name: 'Belts'},
    { cost: 65, name: 'Dress'}
  ],

  /* Constants for ranks given to a student */
  ranks: [
    { name: 'White Belt (Rank 10)', value: 10},
    { name: 'Yellow Belt (Rank 9)', value: 9},
    { name: 'Half Green Belt (Rank 8)', value: 8},
    { name: 'Green Belt (Rank 7)', value: 7},
    { name: 'Half Blue Belt (Rank 6)', value: 6},
    { name: 'Blue Belt (Rank 5)', value: 5},
    { name: 'Half Red Belt (Rank 4)', value: 4},
    { name: 'Red Belt (Rank 3)', value: 3},
    { name: 'Half Black (Rank 2)', value: 2},
    { name: 'Black Belt (Rank 1)', value: 1},
  ],

  //regex for email
  EMAILREGEX:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  /*constants for end points*/
  BASEURL:'http://localhost:8080/api/',
  get STUDENT_LIST(){return this.BASEURL + 'student'}
}
