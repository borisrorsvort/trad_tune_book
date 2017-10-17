import { UPDATE_TITLE, TOGGLE_DRAWER } from "../constants/actionTypes";

export function updateTitle(title) {
  return {
    type: UPDATE_TITLE,
    title: title
  };
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER
  };
}
