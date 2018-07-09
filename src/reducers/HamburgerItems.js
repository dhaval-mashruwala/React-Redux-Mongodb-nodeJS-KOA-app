/* The reducer will always return an array of hamburger items
 * ===============================================================
 * @author: utsavk1993
 */

export default function () {
  return [
    {
      eventKey: 1,
      iconClass: 'fa fa-list-alt',
      name: 'List of Students',
      url: '/student-list'
    },
    {
      eventKey: 2,
      iconClass: 'fa fa-registered',
      name: 'Student Registration',
      url: '/student-registration'
    },
    {
      eventKey: 3,
      iconClass: 'fa fa-pencil',
      name: 'Record Attendance',
      url: '/record-attendance'
    },
    {
      eventKey: 4,
      iconClass: 'fa fa-percent',
      name: 'Track Student Attendance',
      url: '/track-student-attendance'
    },
    {
      eventKey: 5,
      iconClass: 'fa fa-dollar',
      name: 'Track Student Finance',
      url: '/track-student-finance'
    },
    {
      eventKey: 6,
      iconClass: 'fa fa-users',
      name: 'Track Student Parents',
      url: '/track-student-parents'
    }
  ]
}