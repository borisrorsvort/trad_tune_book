import axios from 'axios';
import { REQUEST_TUNEBOOK, RECEIVE_TUNEBOOK, MEMBER_URL } from '../constants/actionTypes';

function requestTuneBook(data) {
  return {
    type: REQUEST_TUNEBOOK,
  };
}

function receiveTuneBook(data) {
  return {
    type: RECEIVE_TUNEBOOK,
    tunes: data.tunes
  };
}

export const fetchTuneBook = memberId => (dispatch) => {
  dispatch(requestTuneBook());
  return axios.get(`${MEMBER_URL}${memberId}/tunebook?format=json`)
    .then(function (response) {
      dispatch(receiveTuneBook(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};