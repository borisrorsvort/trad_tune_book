import * as types from "../constants/actionTypes";

import axios from "axios";

function requestTuneBook() {
  return {
    type: types.REQUEST_TUNEBOOK
  };
}

function receiveTuneBook(data) {
  return {
    type: types.RECEIVE_TUNEBOOK,
    tunes: data.tunes
  };
}

function requestTune() {
  return {
    type: types.REQUEST_TUNE
  };
}

function receiveTune(tune) {
  return {
    type: types.RECEIVE_TUNE,
    currentTune: tune
  };
}

export const fetchTuneBook = memberId => dispatch => {
  dispatch(requestTuneBook());
  return axios
    .get(`${MEMBER_URL}${memberId}/tunebook?format=json&per_page=100`)
    .then(function(response) {
      dispatch(receiveTuneBook(response.data));
    })
    .catch(function(error) {
      alert("something went wrong, try again late");
    });
};

export const fetchTune = tuneId => dispatch => {
  dispatch(requestTune());
  return axios
    .get(`${TUNE_URL}${tuneId}?format=json`)
    .then(function(response) {
      dispatch(receiveTune(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
};
