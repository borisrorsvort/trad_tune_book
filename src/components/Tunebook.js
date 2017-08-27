import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { fetchTuneBook } from '../actions/tuneBook';
import { connect } from 'react-redux';
import store from '../store';
import Tune from './Tune';
import { Fragment } from 'redux-little-router';
import he from 'he';
import { MusicNote } from 'material-ui-icons';
import { List, ListItemIcon, ListItem, ListItemText } from 'material-ui';
import { redirect } from '../actions/router';
import { commonStyles } from '../styles/common';

class Tunebook extends Component {
  componentDidMount() {
    store.dispatch(fetchTuneBook('63117'));
  }

  handleClick = href => {
    store.dispatch(redirect(href));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <List className={classes.sideNav}>
          {this.props.tunes.map(tune =>
            <ListItem
              key={tune.id}
              className={classes.button}
              button
              onClick={item => this.handleClick(`/tunebook/${tune.id}`)}
            >
              <ListItemIcon>
                <MusicNote />
              </ListItemIcon>
              <ListItemText primary={he.decode(tune.name)} />
            </ListItem>,
          )}
        </List>
        <Fragment forRoute="/:tuneId">
          <Tune />
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tunes: state.tunebook.tunes || [],
});

export default connect(mapStateToProps)(withStyles(commonStyles)(Tunebook));
