import * as types from "../constants/actionTypes";

import axios from "axios";

function requestSets() {
  return {
    type: types.REQUEST_SETS
  };
}

function receiveSets(sets, meta, add = false) {
  return {
    type: types.RECEIVE_SETS,
    sets: sets,
    meta: meta,
    add: add
  };
}

function requestSet() {
  return {
    type: types.REQUEST_SET
  };
}

function receiveSet(set) {
  return {
    type: types.RECEIVE_SET,
    currentSet: set
  };
}

export const fetchSets = (memberId, nextPage = 1, add = false) => dispatch => {
  dispatch(requestSets());
  return axios
    .get(
      `${types.MEMBER_URL}${memberId}/sets?format=json&page=${nextPage}&perpage=50`
    )
    .then(function(response) {
      const { page, pages, total, sets, perpage } = response.data;
      dispatch(
        receiveSets(
          sets,
          {
            page: page,
            pages: pages,
            perpage: perpage,
            total: total
          },
          add
        )
      );
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const fetchSet = (memberId, setId) => dispatch => {
  dispatch(requestSet());
  return axios
    .get(`${types.MEMBER_URL}${memberId}/sets/${setId}?format=json`)
    .then(function(response) {
      dispatch(receiveSet(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
};
