import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import { withStyles } from 'material-ui/styles';
import { fetchTuneBook } from '../actions/tuneBook';
import { connect } from 'react-redux';
import store from '../store';
import Tune from './Tune';
import { Link, Fragment } from 'redux-little-router';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ABCJS from 'exports-loader?ABCJS!script-loader!../../node_modules/abcjs/bin/abcjs_basic_2.3-min.js';

const styles = {
  flex: {
    flex: 1,
  },
};
class Tunebook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tune: 'X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n'
    }
  }
  componentDidMount() {
    store.dispatch(fetchTuneBook('63117'))
    this.renderMusicSheet(this.state.tune)
  }

  renderMusicSheet(tune) {
    ABCJS.renderAbc('music-sheet', tune)
  }
  render() {
    return (
      <SplitPane split="vertical" minSize={250}>
        <ul>
          {this.props.tunes.map(tune =>
            <li key={tune.id}>
              <Link className='anything' href={`/tunebook/${tune.id}`}>
                {tune.name}
              </Link>
            </li>
          )}
        </ul>
        <Fragment forRoute='/:tune_id'><Tune /></Fragment>
      </SplitPane>
    );
  }
}

const mapStateToProps = (state) => ({
  tunes: state.rootReducer.tunebook.tunes || []
})

export default withStyles(styles)(connect(mapStateToProps)(Tunebook));