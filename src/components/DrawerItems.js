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
import MusicNote from "material-ui-icons/MusicNote";
import he from "he";
import { toggleDrawer } from "../actions/ui";
import classNames from "classnames";
import { tuneOrSetUrl } from "../helpers/routerHelper";

const styles = theme => ({
  activeListItem: {
    background: "#ddd"
  }
});

class DrawerItems extends Component {
  componentDidMount() {
    switch (this.props.type) {
      case "tunes":
        store.dispatch(fetchTuneBook(this.props.userId));
        break;
      default:
        store.dispatch(fetchSets(this.props.userId));
        break;
    }
  }

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
  items: props.type === "sets" ? state.sets.sets : state.tunes.tunes,
  userId: state.session.currentUser.id,
  router: state.router
});

export default connect(mapStateToProps)(withStyles(styles)(DrawerItems));
