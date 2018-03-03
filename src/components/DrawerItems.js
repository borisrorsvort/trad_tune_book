import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "material-ui";
import React, { Component } from "react";

import MusicNote from "material-ui-icons/MusicNote";
import _sortBy from "lodash/sortBy";
import classNames from "classnames";
import { connect } from "react-redux";
import he from "he";
import { redirect } from "../actions/router";
import store from "../store";
import { toggleDrawer } from "../actions/ui";
import { tuneOrSetUrl } from "../helpers/routerHelper";

const styles = theme => ({
  activeListItem: {
    background: "#ddd"
  }
});

class DrawerItems extends Component {
  handleClick = item => _e => {
    const href = tuneOrSetUrl(item.id, this.props.type);
    store.dispatch(redirect(href));
    store.dispatch(toggleDrawer());
  };

  isActive(id) {
    const { router: { params } } = this.props;
    const itemId = id.toString();
    return params.setId === itemId || params.tuneId === itemId;
  }

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.sideNav}>
        {this.props.items.map(item => (
          <ListItem
            key={item.id}
            className={classNames({
              [`${classes.activeListItem}`]: this.isActive(item.id)
            })}
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
  items: _sortBy(props.type === "sets" ? state.sets.sets : state.tunes.tunes, [
    "name"
  ]),
  router: state.router
});

export default connect(mapStateToProps)(withStyles(styles)(DrawerItems));
