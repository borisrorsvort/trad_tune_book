import { Drawer, Hidden, withStyles } from "material-ui";
import React, { Component } from "react";

import DrawerItems from "./DrawerItems";
import { Fragment } from "redux-little-router";
import { connect } from "react-redux";
import { fetchSets } from "../actions/sets";
import { fetchTuneBook } from "../actions/tuneBook";
import { layoutStyles } from "../styles/layout";
import sizeMe from "react-sizeme";
import store from "../store";
import { toggleDrawer } from "../actions/ui";

class DrawerResponsive extends Component {
  componentDidMount() {
    store.dispatch(fetchTuneBook(this.props.userId));
    store.dispatch(fetchSets(this.props.userId));
  }

  handleDrawerToggle() {
    store.dispatch(toggleDrawer());
  }

  render() {
    const { classes } = this.props;

    const drawerContent = (
      <div>
        <Fragment forRoute="/tunes">
          <DrawerItems type="tunes" />
        </Fragment>
        <Fragment forRoute="/sets">
          <DrawerItems type="sets" />
        </Fragment>
      </div>
    );

    const MeasuredDrawer = sizeMe()(Drawer);

    return (
      <div className="drawer-container">
        <Hidden mdUp>
          <MeasuredDrawer
            variant="temporary"
            anchor={"left"}
            open={this.props.showDrawer}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawerContent}
          </MeasuredDrawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            variant="persistent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userId: state.session.currentUser.id
});

export default connect(mapStateToProps)(
  withStyles(layoutStyles)(DrawerResponsive)
);
