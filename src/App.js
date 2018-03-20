import "./App.css";

import { Button, Hidden } from "material-ui";
import React, { Component } from "react";

import AppBar from "material-ui/AppBar";
import DrawerResponsive from "./components/DrawerResponsive";
import { Fragment } from "redux-little-router";
import IconButton from "material-ui/IconButton";
import { Link } from "redux-little-router";
import MenuIcon from "material-ui-icons/Menu";
import NavDropDown from "./components/NavDropDown";
import Sets from "./components/Sets";
import Toolbar from "material-ui/Toolbar";
import Tunebook from "./components/Tunebook";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { layoutStyles } from "./styles/layout";
import { redirect } from "./actions/router";
import smallLogoUrl from "./images/logo-small.svg";
import store from "./store";
import { toggleDrawer } from "./actions/ui";
import { withStyles } from "material-ui/styles";

class App extends Component {
  componentWillMount() {
    if (this.props.isLoggedOut) {
      store.dispatch(redirect("/"));
    }
  }

  handleDrawerToggle() {
    store.dispatch(toggleDrawer());
  }

  render() {
    const { classes, isLoggedOut } = this.props;
    if (isLoggedOut) {
      return null;
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
                Hi! {this.props.userName}
              </span>
            </Hidden>
            <Button component={Link} href="/" color="secondary">
              Change user
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <Fragment forRoute="/tunes">
            <Tunebook />
          </Fragment>
          <Fragment forRoute="/sets">
            <Sets />
          </Fragment>
        </div>
        <DrawerResponsive showDrawer={this.props.showDrawer} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router,
  showDrawer: state.ui.showDrawer,
  isLoggedOut: isEmpty(state.session.currentUser),
  userName: state.session.currentUser.name
});

export default connect(mapStateToProps)(withStyles(layoutStyles)(App));
