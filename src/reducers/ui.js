import { TOGGLE_DRAWER } from "../constants/actionTypes";

function ui(
  state = {
    showDrawer: false
  },
  action
) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        showDrawer: action.forceClose ? false : !state.showDrawer
      });
    default:
      return state;
  }
}

export default ui;
