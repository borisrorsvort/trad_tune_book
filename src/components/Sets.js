import React, { Component } from 'react';
import { connect } from 'react-redux';
import Set from './Set';
import he from 'he';
import {
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from 'material-ui';
import { fetchSets } from '../actions/sets';
import store from '../store';
import { MusicNote } from 'material-ui-icons';
import { Fragment } from 'redux-little-router';
import { redirect } from '../actions/router';
import { commonStyles } from '../styles/common';

class Sets extends Component {
  componentDidMount() {
    store.dispatch(fetchSets('63117'));
  }

  handleClick = href => {
    store.dispatch(redirect(href));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <List className={classes.sideNav}>
          {this.props.sets.map(set =>
            <ListItem
              key={set.id}
              className={classes.button}
              button
              onClick={item => this.handleClick(`/sets/${set.id}`)}
            >
              <ListItemIcon>
                <MusicNote />
              </ListItemIcon>
              <ListItemText primary={he.decode(set.name)} />
            </ListItem>,
          )}
        </List>
        <Fragment forRoute="/:setId">
          <Set />
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sets: state.sets.sets || [],
});

export default connect(mapStateToProps)(withStyles(commonStyles)(Sets));
