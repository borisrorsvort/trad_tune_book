import axios from 'axios';
import {
  REQUEST_SETS,
  RECEIVE_SETS,
  REQUEST_SET,
  RECEIVE_SET,
  MEMBER_URL,
} from '../constants/actionTypes';

function requestSets() {
  return {
    type: REQUEST_SETS,
  };
}

function receiveSets(data) {
  return {
    type: RECEIVE_SETS,
    sets: data.sets,
  };
}

function requestSet() {
  return {
    type: REQUEST_SET,
  };
}

function receiveSet(set) {
  return {
    type: RECEIVE_SET,
    currentSet: set,
  };
}

export const fetchSets = memberId => dispatch => {
  dispatch(requestSets());
  return axios
    .get(`${MEMBER_URL}${memberId}/sets?format=json`)
    .then(function(response) {
      dispatch(receiveSets(response.data));
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const fetchSet = (memberId, setId) => dispatch => {
  dispatch(requestSet());
  return axios
    .get(`${MEMBER_URL}${memberId}/sets/${setId}?format=json`)
    .then(function(response) {
      dispatch(receiveSet(JSON.parse(response.data)));
    })
    .catch(function(error) {
      console.log(error);
    });
};
