import { UPDATE_USER_ID } from "../constants/actionTypes";

export function updateUserId(userId) {
  return {
    type: UPDATE_USER_ID,
    userId: userId
  };
}
