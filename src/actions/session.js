import {
  UPDATE_CURRENT_USER,
  REQUEST_USER_ID,
  MEMBER_URL
} from "../constants/actionTypes";
import axios from "axios";

export function updateCurrentUser(currentUser) {
  return {
    type: UPDATE_CURRENT_USER,
    currentUser: currentUser
  };
}

export function requestUserId() {
  return {
    type: REQUEST_USER_ID
  };
}

export const fetchUserId = query => {
  return axios
    .get(`${MEMBER_URL}search?q=${query}&format=json`)
    .catch(function(error) {
      console.log(error);
    });
};
