import {
  REQUEST_TUNEBOOK,
  RECEIVE_TUNEBOOK,
  REQUEST_TUNE,
  RECEIVE_TUNE
} from "../constants/actionTypes";

function tunes(
  state = {
    isFetching: false,
    tunes: [],
    currentTune: {
      isFetching: false
    }
  },
  action
) {
  switch (action.type) {
    case REQUEST_TUNEBOOK:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_TUNEBOOK:
      return Object.assign({}, state, {
        isFetching: false,
        tunes: action.tunes
      });
    case REQUEST_TUNE:
      return Object.assign({}, state, {
        currentTune: {
          isFetching: true
        }
      });
    case RECEIVE_TUNE:
      const currentTune = action.currentTune;
      return Object.assign({}, state, {
        currentTune: {
          ...currentTune,
          isFetching: false
        }
      });
    default:
      return state;
  }
}

export default tunes;
