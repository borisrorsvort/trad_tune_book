import { Button, Menu, MenuItem } from "@material-ui/core";
import React, { Component } from "react";

import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { SIDEBAR_WIDTH } from "../constants/layout";
import { connect } from "react-redux";
import { currentSection } from "../helpers/routerHelper";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";

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

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  menuOptions() {
    return [
      {
        label: `Sets (${this.props.setsCount})`,
        shortLabel: "Sets",
        to: `/tunebook/${this.props.currentUser.id}/sets`,
        index: 0
      },
      {
        label: `Tunes (${this.props.tunesCount})`,
        shortLabel: "Tunes",
        to: `/tunebook/${this.props.currentUser.id}/tunes`,
        index: 1
      }
    ];
  }

  render() {
    const { classes, location } = this.props;
    const selectedMenuItem = this.menuOptions().find(o =>
      o.label.toLowerCase().includes(currentSection(location))
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
              component={Link}
              selected={index === selectedMenuItem.index}
              to={option.to}
              onClick={() => this.handleRequestClose()}
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
    tunesCount: state.tunes.meta && state.tunes.meta.total,
    setsCount: state.sets.meta && state.sets.meta.total,
    currentUser: state.session.currentUser
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(NavDropDown))
);
