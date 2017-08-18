import React, { Component } from 'react';
import store from '../store';
import { fetchTune } from '../actions/tuneBook';
import { connect } from 'react-redux';
import he from 'he';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ABCJS from 'exports-loader?ABCJS!script-loader!../../node_modules/abcjs/bin/abcjs_basic_2.3-min.js';

class Tune extends Component {
  componentDidMount() {
    store.dispatch(fetchTune(this.props.tuneId));
  }

  componentWillReceiveProps(nextProps) {
    const newTuneId = nextProps.tuneId
    if (this.props.tuneId !== newTuneId) {
      store.dispatch(fetchTune(newTuneId));
    }
  }

  componentDidUpdate() {
    if (this.props.currentTune.settings !== undefined) {
      this.renderMusicSheet(this.props.currentTune.settings[0].abc)
    }
  }

  renderMusicSheet(tune) {
    ABCJS.renderAbc('music-sheet', tune)
  }

  render() {
    if (
      this.props.currentTune === undefined || 
      this.props.currentTune.name === undefined
    ) {
      return null 
    }
    
    return (
      <div>
        <h2>{he.decode(this.props.currentTune.name)}</h2>
        <code>
          {this.props.currentTune.settings[0].abc} 
        </code>
        <div id="music-sheet"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  tuneId: state.router.params.tuneId,
  currentTune: state.tunebook.currentTune
});

export default connect(mapStateToProps)(Tune);