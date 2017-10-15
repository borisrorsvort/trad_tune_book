import React, { Component } from "react";
import "./App.css";

import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import { Fragment } from "redux-little-router";
import Tunebook from "./components/Tunebook";
import DrawerItems from "./components/DrawerItems";
import Sets from "./components/Sets";
import { connect } from "react-redux";
import { redirect } from "./actions/router";
import { Divider, Hidden, Drawer } from "material-ui";
import he from "he";

const drawerWidth = 300;

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%"
  },
  appBar: {
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    width: drawerWidth,
    top: 0,
    left: 0,
    height: "100vh",
    zIndex: 1300,
    position: "fixed",
    overflowY: "auto"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: "calc(100% - 56px)",
    marginTop: 56
  },
  [theme.breakpoints.up("md")]: {
    content: {
      height: "calc(100% - 64px)",
      marginTop: 64,
      marginLeft: drawerWidth
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }
});

class App extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
    const tabsHrefs = ["/", "/tunebook", "/sets"];
    this.props.redirect(tabsHrefs[value]);
  };

  render() {
    const { classes } = this.props;
    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <Fragment forRoute="/tunebook">
          <DrawerItems type="tunes" />
        </Fragment>
        <Fragment forRoute="/sets">
          <DrawerItems type="sets" />
        </Fragment>
      </div>
    );
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Hidden mdUp>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Typography type="title" color="inherit" noWrap>
                {he.decode(this.props.title)}
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={"left"}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper
              }}
              onRequestClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              type="persistent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <div className={classes.content}>
            <Fragment forRoute="/tunebook">
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
const mapDispatchToProps = dispatch => ({
  redirect: href => {
    dispatch(redirect(href));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(App)
);
