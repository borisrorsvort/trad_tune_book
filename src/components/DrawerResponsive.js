import React, { Component } from "react";
import { Hidden, Drawer, Divider, withStyles } from "material-ui";
import NavDropDown from "./NavDropDown";
import DrawerItems from "./DrawerItems";
import { Fragment } from "redux-little-router";
import { layoutStyles } from "../styles/layout";

class DrawerResponsive extends Component {
  constructor(props) {
    super(props);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {
    this.props.handleDrawerToggle();
  }

  render() {
    const { classes } = this.props;
    const drawer = (
      <div>
        <NavDropDown />
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
      <div>
        <Hidden mdUp>
          <Drawer
            type="temporary"
            anchor={"left"}
            open={this.props.mobileOpen}
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
      </div>
    );
  }
}

export default withStyles(layoutStyles)(DrawerResponsive);
