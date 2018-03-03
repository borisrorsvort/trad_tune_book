import {
  MEMBER_URL,
  RECEIVE_TUNE,
  RECEIVE_TUNEBOOK,
  REQUEST_TUNE,
  REQUEST_TUNEBOOK,
  TUNE_URL
} from "../constants/actionTypes";

import axios from "axios";

function requestTuneBook() {
  return {
    type: REQUEST_TUNEBOOK
  };
}

function receiveTuneBook(data) {
  return {
    type: RECEIVE_TUNEBOOK,
    tunes: data.tunes
  };
}

function requestTune() {
  return {
    type: REQUEST_TUNE
  };
}

function receiveTune(tune) {
  return {
    type: RECEIVE_TUNE,
    currentTune: tune
  };
}

export const fetchTuneBook = memberId => dispatch => {
  dispatch(requestTuneBook());
  return axios
    .get(`${MEMBER_URL}${memberId}/tunebook?format=json`)
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
