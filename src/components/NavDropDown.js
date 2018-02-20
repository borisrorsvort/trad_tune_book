import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem
} from "material-ui";
import React, { Component } from "react";

import KeyboardArrowDown from "material-ui-icons/KeyboardArrowDown";
import { SIDEBAR_WIDTH } from "../constants/layout";
import { connect } from "react-redux";
import { currentSection } from "../helpers/routerHelper";
import { redirect } from "../actions/router";
import store from "../store";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

class NavDropDown extends Component {
  state = {
    anchorEl: null,
    open: false,
    selectedIndex: 1
  };

  handleClickListItem = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false });
    store.dispatch(redirect(this.menuOptions()[index].href));
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  menuOptions() {
    return [
      { label: `Sets (${this.props.sets.length})`, href: "/tunebook/sets" },
      { label: `Tunes (${this.props.tunes.length})`, href: "/tunebook/tunes" }
    ];
  }

  render() {
    const { classes } = this.props;
    const selectedMenuItem = this.menuOptions().find(o =>
      o.label.toLowerCase().includes(currentSection(this.props.router))
    );

    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
          >
            <ListItemText primary={selectedMenuItem.label} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Tunebooks">
                <KeyboardArrowDown />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          PaperProps={{
            style: {
              width: SIDEBAR_WIDTH - 35
            }
          }}
        >
          {this.menuOptions().map((option, index) => (
            <MenuItem
              key={option.label}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    router: state.router,
    tunes: state.tunes.tunes,
    sets: state.sets.sets
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NavDropDown));
