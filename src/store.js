import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { initializeCurrentLocation, routerForBrowser } from 'redux-little-router';
import rootReducer from "./reducers/index";
import { routes } from './router';

const {
  reducer,
  middleware,
  enhancer
} = routerForBrowser({routes})

const middlewares = [thunk, middleware];

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

const store = createStore(
  combineReducers({ router: reducer, ...rootReducer }),
  composeEnhancers(enhancer, applyMiddleware(...middlewares)),
);

const initialLocation = store.getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

export default store;
