import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
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

const styles = theme => ({
  flex: {
    flex: 1,
  },
});

class Tunebook extends Component {
  componentDidMount() {
    store.dispatch(fetchTuneBook('63117'));
  }

  handleClick = href => {
    store.dispatch(redirect(href));
  };

  render() {
    return (
      <SplitPane split="vertical" minSize={250}>
        <List>
          {this.props.tunes.map(tune =>
            <ListItem
              key={tune.id}
              className={this.props.classes.button}
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
      </SplitPane>
    );
  }
}

const mapStateToProps = state => ({
  tunes: state.tunebook.tunes || [],
});

export default connect(mapStateToProps)(withStyles(styles)(Tunebook));
