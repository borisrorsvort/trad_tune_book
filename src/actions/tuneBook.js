import * as types from "../constants/actionTypes";

import axios from "axios";

function requestTuneBook() {
  return {
    type: types.REQUEST_TUNEBOOK
  };
}

function receiveTuneBook(tunes, meta, add = false) {
  return {
    type: types.RECEIVE_TUNEBOOK,
    tunes: tunes,
    meta: meta,
    add: add
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

export const fetchTuneBook = (
  memberId,
  nextPage = 1,
  add = false
) => dispatch => {
  dispatch(requestTuneBook());
  return axios
    .get(
      `${
        types.MEMBER_URL
      }${memberId}/tunebook?format=json&page=${nextPage}&per_page=50`
    )
    .then(function(response) {
      const { page, pages, per_page, total, tunes } = response.data;
      dispatch(
        receiveTuneBook(
          tunes,
          {
            page: page,
            pages: pages,
            per_page: per_page,
            total: total
          },
          add
        )
      );
    })
    .catch(function(error) {
      alert("something went wrong, try again late");
    });
};

export const fetchTune = tuneId => dispatch => {
  dispatch(requestTune());
  return axios
    .get(`${types.TUNE_URL}${tuneId}?format=json`)
    .then(function(response) {
      dispatch(receiveTune(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
};
