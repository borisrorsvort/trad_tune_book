import { Button, Menu, MenuItem } from "material-ui";
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
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    marginLeft: "20px"
  },
  righIcon: {
    marginLeft: 16
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
      {
        label: `Sets (${this.props.setsCount})`,
        shortLabel: "Sets",
        href: "/tunebook/sets"
      },
      {
        label: `Tunes (${this.props.tunesCount})`,
        shortLabel: "Tunes",
        href: "/tunebook/tunes"
      }
    ];
  }

  render() {
    const { classes } = this.props;
    const selectedMenuItem = this.menuOptions().find(o =>
      o.label.toLowerCase().includes(currentSection(this.props.router))
    );

    return (
      <div className={classes.root}>
        <Button
          aria-owns={this.state.anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClickListItem}
          color="secondary"
        >
          {selectedMenuItem.shortLabel}
          <KeyboardArrowDown className={classes.righIcon} />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
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
    tunesCount: state.tunes.meta && state.tunes.meta.total,
    setsCount: state.sets.meta && state.sets.meta.total
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NavDropDown));
