import { UPDATE_USER_ID } from "../constants/actionTypes";

function session(
  state = {
    userId: null
  },
  action
) {
  switch (action.type) {
    case UPDATE_USER_ID:
      return Object.assign({}, state, {
        userId: action.userId
      });
    default:
      return state;
  }
}

// 63117

export default session;
