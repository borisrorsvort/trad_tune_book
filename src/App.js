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

class App extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

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
              <Typography type="title" color="accent" noWrap>
                {he.decode(this.props.title)}
              </Typography>
            </Toolbar>
          </AppBar>
          <DrawerResponsive
            mobileOpen={this.state.mobileOpen}
            handleDrawerToggle={this.handleDrawerToggle}
          />
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
  title: state.ui.title
});

export default connect(mapStateToProps)(withStyles(layoutStyles)(App));
