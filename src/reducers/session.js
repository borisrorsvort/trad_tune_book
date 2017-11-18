import { UPDATE_CURRENT_USER } from "../constants/actionTypes";

function session(
  state = {
    currentUser: {}
  },
  action
) {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.currentUser
      });
    default:
      return state;
  }
}

export default session;
