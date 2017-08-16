import { REQUEST_TUNEBOOK, RECEIVE_TUNEBOOK } from '../constants/actionTypes';
function tunebook(
  state = {
    isFetching: false,
    tunes: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_TUNEBOOK:
      return Object.assign({}, state, {
        isFetching: true,
        tunes: [],
      });
    case RECEIVE_TUNEBOOK:
      return Object.assign({}, state, {
        isFetching: false,
        tunes: action.tunes,
      });
    default:
      return state;
  }
}

export default tunebook;
