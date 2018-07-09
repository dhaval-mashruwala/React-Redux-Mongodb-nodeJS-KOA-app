function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}


export const actionsTypes = createConstants(
  'STUDENT_LIST_SUCCESS',
  'STUDENT_LIST_ERROR',
  'STUDENT_REGISTER_SUCCESS',
  'STUDENT_REGISTER_ERROR',
  'STUDENT_DELETE_SUCCESS',
  'STUDENT_DELETE_ERROR',
  'STUDENT_UPDATE_SUCCESS',
  'STUDENT_UPDATE_ERROR',
  'STUDENT_ATTENDANCE_SUCCESS',
  'STUDENT_ATTENDANCE_ERROR',

);
