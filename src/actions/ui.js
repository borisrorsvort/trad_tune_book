import { TOGGLE_DRAWER } from "../constants/actionTypes";

export function toggleDrawer(forceClose = false) {
  return {
    type: TOGGLE_DRAWER,
    forceClose
  };
}
