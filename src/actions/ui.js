import { UPDATE_TITLE } from "../constants/actionTypes";

export function updateTitle(title) {
  return {
    type: UPDATE_TITLE,
    title: title
  };
}
