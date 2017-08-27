import React, { Component } from 'react';
import store from '../store';
import { fetchTune } from '../actions/tuneBook';
import { connect } from 'react-redux';
import SheetMusic from './SheetMusic';
import he from 'he';
import { Link } from 'redux-little-router';
import { withStyles } from 'material-ui';
import { commonStyles } from '../styles/common';

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
    const { classes } = this.props;
    if (
      this.props.currentTune === undefined ||
      this.props.currentTune.name === undefined
    ) {
      return null;
    }

    return (
      <div className={classes.content}>
        <h2>
          <Link href={this.props.currentTune.url} target="_blank">
            {he.decode(this.props.currentTune.name)}
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

export default connect(mapStateToProps)(withStyles(commonStyles)(Tune));
