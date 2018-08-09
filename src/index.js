import "./index.css";

import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import App from "./App";
import { Fragment } from "redux-little-router";
import Home from "./components/Home";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";

const white = {
  50: "#fff",
  100: "#fff",
  200: "#fff",
  300: "#fff",
  400: "#fff",
  500: "#fff",
  600: "#fff",
  700: "#fff",
  800: "#fff",
  900: "#fff",
  A100: "#fff",
  A200: "#fff",
  A400: "#fff",
  A700: "#fff",
  contrastDefaultColor: "brown"
};

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      ...white
    },
    error: red
  }
});

const app = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Fragment forRoute="/">
        <div>
          <Fragment forRoute="/">
            <Home />
          </Fragment>
          <App />
        </div>
      </Fragment>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
