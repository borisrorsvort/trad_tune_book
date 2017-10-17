import { UPDATE_TITLE, TOGGLE_DRAWER } from "../constants/actionTypes";

function ui(
  state = {
    title: "Trad Tunes book",
    showDrawer: false
  },
  action
) {
  switch (action.type) {
    case UPDATE_TITLE:
      return Object.assign({}, state, {
        title: action.title
      });
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        showDrawer: !state.showDrawer
      });
    default:
      return state;
  }
}

export default ui;
