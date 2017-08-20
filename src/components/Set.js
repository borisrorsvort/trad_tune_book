import React, { Component } from 'react';
import store from '../store';
import { connect } from 'react-redux';
import he from 'he';
import SheetMusic from './SheetMusic';
import { Link } from 'redux-little-router';
import { fetchSet } from '../actions/sets';

class Set extends Component {
  componentDidMount() {
    store.dispatch(fetchSet('63117', this.props.setId));
  }

  componentWillReceiveProps(nextProps) {
    const newSetId = nextProps.setId;
    if (this.props.setId !== newSetId) {
      store.dispatch(fetchSet('63117', newSetId));
    }
  }

  render() {
    if (
      this.props.currentSet === undefined ||
      this.props.currentSet.name === undefined
    ) {
      return null;
    }

    return (
      <div>
        <h2>
          <Link href={this.props.currentSet.url} target="_blank">
            {this.props.currentSet.name}
          </Link>
        </h2>
        {this.props.currentSet.settings.map(setting => {
          return <SheetMusic key={setting.id} tune={setting} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  setId: state.router.params.setId,
  currentSet: state.sets.currentSet,
});

export default connect(mapStateToProps)(Set);
