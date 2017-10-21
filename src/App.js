import React, { Component } from "react";
import { connect } from "react-redux";
import { Fragment } from "redux-little-router";
import { Hidden } from "material-ui";
import he from "he";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";

import Tunebook from "./components/Tunebook";
import Sets from "./components/Sets";
import DrawerResponsive from "./components/DrawerResponsive";

import { withStyles } from "material-ui/styles";
import { layoutStyles } from "./styles/layout";
import "./App.css";
import store from "./store";
import { toggleDrawer } from "./actions/ui";
import { redirect } from "./actions/router";
import { randomTuneOrSetUrl } from "./helpers/routerHelper";

class App extends Component {
  handleDrawerToggle() {
    store.dispatch(toggleDrawer());
  }

  goToRandom() {
    store.dispatch(redirect(randomTuneOrSetUrl()));
  }

  render() {
    const { classes } = this.props;

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
                noWrap
                onClick={this.goToRandom}
              >
                {he.decode(this.props.title)}
              </Typography>
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
  showDrawer: state.ui.showDrawer
});

export default connect(mapStateToProps)(withStyles(layoutStyles)(App));
