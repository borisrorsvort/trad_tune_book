import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { loadState, saveState } from "./helpers/localStorage";

import LogRocket from "logrocket";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

const persistedState = loadState();

const middlewares = [thunk];

if (process.env.NODE_ENV !== "development") {
  LogRocket.init("hh8o22/foinn");
}

const composeEnhancers =
  process.env.NODE_ENV === "development" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const store = createStore(
  combineReducers(rootReducer),
  persistedState,
  composeEnhancers(applyMiddleware(...middlewares))
);

store.subscribe(() => {
  saveState({
    session: store.getState().session,
    tunes: store.getState().tunes,
    sets: store.getState().sets
  });
});

export default store;
