import "./App.css";

import { Button, Hidden } from "material-ui";
import React, { Component } from "react";

import AppBar from "material-ui/AppBar";
import DrawerResponsive from "./components/DrawerResponsive";
import { Fragment } from "redux-little-router";
import IconButton from "material-ui/IconButton";
import { Link } from "redux-little-router";
import MenuIcon from "material-ui-icons/Menu";
import Sets from "./components/Sets";
import Toolbar from "material-ui/Toolbar";
import Tunebook from "./components/Tunebook";
import Typography from "material-ui/Typography";
import { connect } from "react-redux";
import he from "he";
import isEmpty from "lodash/isEmpty";
import { layoutStyles } from "./styles/layout";
import { redirect } from "./actions/router";
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
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Hidden mdUp>
                <IconButton
                  color="accent"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Typography
                type="title"
                color="accent"
                className={classes.flex}
                noWrap
              >
                {he.decode(this.props.title)}
              </Typography>
              <Button component={Link} href="/" color="accent">
                Change user
              </Button>
            </Toolbar>
          </AppBar>
          <DrawerResponsive showDrawer={this.props.showDrawer} />
          <div className={classes.content}>
            <Fragment forRoute="/tunes">
              <Tunebook />
            </Fragment>
            <Fragment forRoute="/sets">
              <Sets />
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router,
  title: state.ui.title,
  showDrawer: state.ui.showDrawer,
  isLoggedOut: isEmpty(state.session.currentUser)
});

export default connect(mapStateToProps)(withStyles(layoutStyles)(App));
