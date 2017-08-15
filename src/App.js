import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SplitPane from 'react-split-pane';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ABCJS from 'exports-loader?ABCJS!script-loader!./../node_modules/abcjs/bin/abcjs_basic_2.3-min.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tune: 'X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n'
    }
  }

  componentDidMount() {
    this.renderMusicSheet(this.state.tune)
  }

  renderMusicSheet(tune) {
    ABCJS.renderAbc('music-sheet', tune)
  }

  render() {
    return (
      <SplitPane split="vertical" minSize={250}>
          <div>arsuiet</div>
          <div id='music-sheet'></div>
      </SplitPane>
    );
  }
}

export default App;
