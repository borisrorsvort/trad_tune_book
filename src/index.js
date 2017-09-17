import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import createPalette from 'material-ui/styles/palette';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import grey from 'material-ui/colors/grey';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: createPalette({
    primary: {
      ...grey,
      500: grey[900]
    },
    accent: {
      ...green,
      A200: green[500]
    },
    error: red
  })
});
// const theme = createMuiTheme({
//   palette: createPalette({
//     primary: {
//       ...green,
//       500: '#fff'
//     },
//     accent: {
//       ...green,
//       A200: green[500],
//     },
//     error: red,
//   }),
// });

const app = (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
