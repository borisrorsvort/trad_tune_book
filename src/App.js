import "./App.css";

import { Button, Hidden } from "@material-ui/core";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import DrawerResponsive from "./components/DrawerResponsive";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavDropDown from "./components/NavDropDown";
import Sets from "./components/Sets";
import Toolbar from "@material-ui/core/Toolbar";
import Tunebook from "./components/Tunebook";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { layoutStyles } from "./styles/layout";
import { logout } from "./actions/session";
import smallLogoUrl from "./images/logo-small.svg";
import store from "./store";
import { toggleDrawer } from "./actions/ui";
import { withStyles } from "@material-ui/core/styles";
import { Redirect, withRouter } from "react-router-dom";

class App extends Component {
  handleDrawerToggle() {
    store.dispatch(toggleDrawer());
  }

  render() {
    const { classes, isLoggedOut, match } = this.props;
    const folder = match.params.folder;

    if (isLoggedOut) {
      return <Redirect to="/" />;
    }
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Hidden mdUp>
              <IconButton
                color="secondary"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <div className={classes.flex}>
              <Hidden smDown>
                <img src={smallLogoUrl} alt="Foinn" className={classes.logo} />
              </Hidden>
              <NavDropDown />
            </div>

            <Hidden smDown>
              <span className={classes.greetings}>
                Hi! {this.props.currentUser.name}
              </span>
            </Hidden>
            <Button onClick={() => this.props.logout()} color="secondary">
              Change user
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          {folder === "tunes" ? <Tunebook /> : <Sets />}
        </div>
        <DrawerResponsive showDrawer={this.props.showDrawer} folder={folder} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showDrawer: state.ui.showDrawer,
  isLoggedOut: isEmpty(state.session.currentUser),
  currentUser: state.session.currentUser
});

export default withRouter(
  connect(mapStateToProps, { logout })(withStyles(layoutStyles)(App))
);
