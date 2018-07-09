/* This reducer will listen to all the actions that occur on forms
 * ===============================================================
 * @author: utsavk1993
 */

const formActions = (state=[], action) => {
  switch (action.type) {
      case 'STUDENT_REGISTRATION':
      return [
        ...state,
        {
          data: action.payload
        }
      ];
    default:
      return state;
  }
};

export default formActions;
