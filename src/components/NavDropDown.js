import React, { Component } from "react";
import { KeyboardArrowDown } from "material-ui-icons";
import {
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from "material-ui";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import store from "../store";
import { redirect } from "../actions/router";
import { SIDEBAR_WIDTH } from "../constants/layout";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

const menuOptions = [
  { label: "Sets", href: "/sets" },
  { label: "Tunebook", href: "/tunebook" }
];

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
    store.dispatch(redirect(menuOptions[index].href));
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const selectedMenuItem = menuOptions.find(o =>
      o.label.toLowerCase().includes(this.props.router.pathname.split("/")[1])
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
          {menuOptions.map((option, index) => (
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
    router: state.router
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NavDropDown));
