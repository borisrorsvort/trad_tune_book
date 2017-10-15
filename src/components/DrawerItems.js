import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../store";
import { fetchTuneBook } from "../actions/tuneBook";
import { fetchSets } from "../actions/sets";
import { redirect } from "../actions/router";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "material-ui";
import { MusicNote } from "material-ui-icons";
import he from "he";
import { commonStyles } from "../styles/common";

class DrawerItems extends Component {
  componentDidMount() {
    switch (this.props.type) {
      case "tunes":
        store.dispatch(fetchTuneBook("63117"));
        break;
      default:
        store.dispatch(fetchSets("63117"));
        break;
    }
  }

  handleClick = item => _e => {
    const href =
      this.props.type === "sets" ? `/sets/${item.id}` : `/tunebook/${item.id}`;
    store.dispatch(redirect(href));
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.sideNav}>
        {this.props.items.map(item => (
          <ListItem
            key={item.id}
            className={classes.button}
            button
            onClick={this.handleClick(item)}
          >
            <ListItemIcon>
              <MusicNote />
            </ListItemIcon>
            <ListItemText primary={he.decode(item.name)} />
          </ListItem>
        ))}
      </List>
    );
  }
}

const mapStateToProps = (state, props) => ({
  items: props.type === "sets" ? state.sets.sets : state.tunebook.tunes
});

export default connect(mapStateToProps)(withStyles(commonStyles)(DrawerItems));
