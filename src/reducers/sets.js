import {
  REQUEST_SETS,
  RECEIVE_SETS,
  REQUEST_SET,
  RECEIVE_SET
} from "../constants/actionTypes";
function sets(
  state = {
    isFetching: false,
    sets: [],
    currentSet: {
      isFetching: false
    }
  },
  action
) {
  switch (action.type) {
    case REQUEST_SETS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_SETS:
      return Object.assign({}, state, {
        isFetching: false,
        sets: action.sets
      });
    case REQUEST_SET:
      return Object.assign({}, state, {
        currentSet: {
          isFetching: true
        }
      });
    case RECEIVE_SET:
      const currentSet = action.currentSet;
      return Object.assign({}, state, {
        currentSet: {
          ...currentSet,
          isFetching: false
        }
      });
    default:
      return state;
  }
}

export default sets;
