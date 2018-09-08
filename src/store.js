import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  initializeCurrentLocation,
  routerForBrowser
} from "redux-little-router";
import { loadState, saveState } from "./helpers/localStorage";

import LogRocket from "logrocket";
import rootReducer from "./reducers/index";
import { routes } from "./router";
import thunk from "redux-thunk";

const persistedState = loadState();

const { reducer, middleware, enhancer } = routerForBrowser({ routes });

const middlewares = [thunk, middleware];

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
  combineReducers({ router: reducer, ...rootReducer }),
  persistedState,
  composeEnhancers(enhancer, applyMiddleware(...middlewares))
);

const initialLocation = store.getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

store.subscribe(() => {
  saveState({
    session: store.getState().session,
    tunes: store.getState().tunes,
    sets: store.getState().sets
  });
});

export default store;
