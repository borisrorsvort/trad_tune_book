import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui';
import { fetchSets } from '../actions/sets';
import store from '../store';

const styles = theme => ({
  flex: {
    flex: 1,
  },
});

class Sets extends Component {
  componentDidMount() {
    store.dispatch(fetchSets('63117'));
  }
  render() {
    return <div>sets</div>;
  }
}

const mapStateToProps = state => ({
  sets: state.sets.sets || [],
});

export default connect(mapStateToProps)(withStyles(styles)(Sets));
