import { LOGOUT, UPDATE_CURRENT_USER } from "../constants/actionTypes";

function session(
  state = {
    currentUser: {}
  },
  action
) {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: {}
      };
    default:
      return state;
  }
}

export default session;
