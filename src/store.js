import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import indexReducer from "./reducers/index";
import { createLogger } from "redux-logger";

const middlewares = [thunk];

const composeEnhancers =
  process.env.NODE_ENV === "development" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        {
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        },
      )
    : compose;

if (process.env.NODE_ENV === "development") {
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(
  indexReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
