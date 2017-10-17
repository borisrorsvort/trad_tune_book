import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";
import { Fragment } from "redux-little-router";
import Home from "./components/Home";

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
      <div>
        <Fragment forRoute="/">
          <Home />
        </Fragment>
        <Fragment forRoute="/tunebook">
          <App />
        </Fragment>
      </div>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
