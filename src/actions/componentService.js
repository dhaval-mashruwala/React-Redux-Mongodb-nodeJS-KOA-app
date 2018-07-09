/* The main index file which contains all the user actions performed within an application
 * =======================================================================================
 * @author: utsavk1993
 */

/* This action occurs when the user submits the form on student registration or edit student page
 * ===============================================================================================
 */
import axios from 'axios';
import {Constants} from '../enums';
let {STUDENT_LIST} = Constants;

/* get student by Id*/
export const getStudentListById = async(id) => {
      try {
          let response = await axios.get(STUDENT_LIST+'/'+id);
          return response;
      } catch (e) {
          console.log(e);
      }
};

/* get student list by class*/
export const getStudentListByClass = async (className) => {
      try {
          let response = await axios.get(STUDENT_LIST+'/class/'+className);
          return response;
      } catch (e) {
          console.log(e);
      }
};

/* get attendance details of student*/
export const getAttendanceDetail = async(data) => {
      try {
          data.fromDate.setHours(0);
          data.fromDate.setMinutes(0);
          data.fromDate.setSeconds(0);
          data.fromDate.setMilliseconds(0);
          data.toDate.setHours(23);
          data.toDate.setMinutes(59);
          data.toDate.setSeconds(59);
          data.toDate.setMilliseconds(0);
          let body = {from:data.fromDate,to:data.toDate};
          let response = await axios.post(STUDENT_LIST+'/attendance/'+data.studentId,body);
          return response;
      } catch (e) {
          console.log(e);
      }
};
/* get finance details of student*/
export const getFinanceDetail = async(data) => {
      try {
          data.fromDate.setHours(0);
          data.fromDate.setMinutes(0);
          data.fromDate.setSeconds(0);
          data.toDate.setHours(23);
          data.toDate.setMinutes(59);
          data.toDate.setSeconds(59);
          let body = {from:data.fromDate,to:data.toDate};
          let response = await axios.post(STUDENT_LIST+'/finance/'+data.studentId,body);
          return response;
      } catch (e) {
          console.log(e);
      }
};
