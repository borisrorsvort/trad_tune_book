import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import { withStyles } from 'material-ui/styles';
import { fetchTuneBook } from '../actions/tuneBook';
import { connect } from 'react-redux';
import store from '../store';
import Tune from './Tune';
import { Link, Fragment } from 'redux-little-router';
import he from 'he';

const styles = {
  flex: {
    flex: 1,
  },
};
class Tunebook extends Component {
  componentDidMount() {
    store.dispatch(fetchTuneBook('63117'))
  }

  render() {
    return (
      <SplitPane split="vertical" minSize={250}>
        <ul>
          {this.props.tunes.map(tune =>
            <li key={tune.id}>
              <Link className='anything' href={`/tunebook/${tune.id}`}>
                {he.decode(tune.name)}
              </Link>
            </li>
          )}
        </ul>
        <Fragment forRoute='/:tuneId'><Tune /></Fragment>
      </SplitPane>
    );
  }
}

const mapStateToProps = (state) => ({
  tunes: state.tunebook.tunes || []
})

export default connect(mapStateToProps)(withStyles(styles)(Tunebook));