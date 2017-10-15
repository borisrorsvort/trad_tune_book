import { UPDATE_TITLE } from "../constants/actionTypes";

function ui(
  state = {
    title: "Trad Tunes book"
  },
  action
) {
  switch (action.type) {
    case UPDATE_TITLE:
      return Object.assign({}, state, {
        title: action.title
      });
    default:
      return state;
  }
}

export default ui;
