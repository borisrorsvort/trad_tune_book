import React, { Component } from 'react';
import store from '../store';
import { fetchTune } from '../actions/tuneBook';
import { connect } from 'react-redux';
import he from 'he';
import SheetMusic from './SheetMusic';
import { Link } from 'redux-little-router';

class Tune extends Component {
  componentDidMount() {
    store.dispatch(fetchTune(this.props.tuneId));
  }

  componentWillReceiveProps(nextProps) {
    const newTuneId = nextProps.tuneId;
    if (this.props.tuneId !== newTuneId) {
      store.dispatch(fetchTune(newTuneId));
    }
  }

  render() {
    if (
      this.props.currentTune === undefined ||
      this.props.currentTune.name === undefined
    ) {
      return null;
    }

    return (
      <div>
        <h2>
          <Link href={this.props.currentTune.url} target="_blank">
            {this.props.currentTune.name}
          </Link>
        </h2>
        {this.props.currentTune.settings.map(setting => {
          return <SheetMusic key={setting.id} tune={setting} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tuneId: state.router.params.tuneId,
  currentTune: state.tunebook.currentTune,
});

export default connect(mapStateToProps)(Tune);
