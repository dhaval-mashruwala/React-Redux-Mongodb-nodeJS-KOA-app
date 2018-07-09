/* The main index file which contains all the user actions performed within an application
 * =======================================================================================
 * @author: utsavk1993
 */

/* This action occurs when the user submits the form on student registration or edit student page
 * ===============================================================================================
 */
import axios from 'axios';
import {actionsTypes} from './types';
import {Constants} from '../enums';
let {STUDENT_LIST} = Constants;
export const studentRegistrationFormSubmit = (data) => {
  return {
    type: 'STUDENT_REGISTRATION',
    payload: data
  }
};
/* get student list*/
export const getStudentList = () => {
  return async dispatch => {
        try {
            let response = await axios.get(STUDENT_LIST);
            dispatch({type: actionsTypes.STUDENT_LIST_SUCCESS, payload: response.data});
        } catch (e) {
            console.log(e);
            dispatch({type: actionsTypes.STUDENT_LIST_ERROR});
        }
    }
};
/* Register student*/
export const registerStudent = (data) => {
  return async dispatch => {
        try {
            let response = await axios.post(STUDENT_LIST,data);
            dispatch({type: actionsTypes.STUDENT_REGISTER_SUCCESS, payload: response.data});
        } catch (e) {
            console.log(e);
            dispatch({type: actionsTypes.STUDENT_REGISTER_ERROR});
        }
    }
};
/* edit student*/
export const editStudent = (data) => {
  return async dispatch => {
        try {
            let response = await axios.put(STUDENT_LIST,data);
            dispatch({type: actionsTypes.STUDENT_UPDATE_SUCCESS, payload: response.data});
        } catch (e) {
            console.log(e);
            dispatch({type: actionsTypes.STUDENT_UPDATE_ERROR});
        }
    }
};
/* Delete student*/
export const deleteStudent = (id) => {
  return async dispatch => {
        try {
            let response = await axios.delete(STUDENT_LIST+'/'+id);
            dispatch({type: actionsTypes.STUDENT_DELETE_SUCCESS,payload:id});
        } catch (e) {
            console.log(e);
            dispatch({type: actionsTypes.STUDENT_DELETE_ERROR});
        }
    }
};
/* record attendance of students*/
export const recordAttendance = (data) => {
  return async dispatch => {
        try {
            let response = await axios.post(STUDENT_LIST+'/attendance',{data});
            dispatch({type: actionsTypes.STUDENT_ATTENDANCE_SUCCESS});
        } catch (e) {
            console.log(e);
            dispatch({type: actionsTypes.STUDENT_ATTENDANCE_ERROR});
        }
    }
};
/* get student by Id*/
export const getStudentListById = async(id) => {
      try {
          let response = await axios.get(STUDENT_LIST+'/'+id);
          return response;
      } catch (e) {
          console.log(e);
      }
};
