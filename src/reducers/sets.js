import {
  RECEIVE_SET,
  RECEIVE_SETS,
  REQUEST_SET,
  REQUEST_SETS
} from "../constants/actionTypes";
function sets(
  state = {
    isFetching: false,
    sets: [],
    meta: {},
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
      const sets = action.add ? [...state.sets, ...action.sets] : action.sets;
      return Object.assign({}, state, {
        isFetching: false,
        sets: sets,
        meta: action.meta
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
