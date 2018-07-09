import {actionsTypes} from '../actions/types';

const student = (state={studentList:[]}, action) => {
  switch (action.type) {
      case actionsTypes.STUDENT_LIST_SUCCESS:{
        return {
          ...state,
          studentList:action.payload.data
        }
      }
      case actionsTypes.STUDENT_REGISTER_SUCCESS:{
        state.studentList.push(action.payload.data);
        return {
          ...state,
          studentList:action.payload.data
        }
      }
      case actionsTypes.STUDENT_DELETE_SUCCESS:{
        state.studentList = state.studentList.filter((student)=>student._id!=action.payload);
        return {
          ...state
        }
      }
      case actionsTypes.STUDENT_UPDATE_SUCCESS:{
        state.studentList = state.studentList.map((student)=>{if(student._id == action.payload.studentId){student = Object.assign(student,action.payload.data)}return student});
        return {
          ...state
        }
      }
      default:
      return state;
  }
};

export default student;
