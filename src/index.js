import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
// import createPalette from 'material-ui/styles/palette';
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import grey from "material-ui/colors/grey";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";

// const theme = createMuiTheme({
//   palette: createPalette({
//     primary: {
//       ...grey,
//       500: grey[900]
//     },
//     accent: {
//       ...green,
//       A200: green[500]
//     },
//     error: red
//   })
// });
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
      <App />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
