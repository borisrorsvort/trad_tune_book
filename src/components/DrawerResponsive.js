import { Drawer, Hidden, withStyles } from "@material-ui/core";
import React, { Component } from "react";

import DrawerItems from "./DrawerItems";
import { Fragment } from "redux-little-router";
import { connect } from "react-redux";
import { fetchSets } from "../actions/sets";
import { fetchTuneBook } from "../actions/tuneBook";
import { layoutStyles } from "../styles/layout";
import store from "../store";
import { toggleDrawer } from "../actions/ui";

class DrawerResponsive extends Component {
  state = {
    elementHeigh: 0
  };

  componentDidMount() {
    store.dispatch(fetchTuneBook(this.props.userId));
    store.dispatch(fetchSets(this.props.userId));
    this.setState({ elementHeight: this.divRef.clientHeight });
  }

  handleDrawerToggle() {
    store.dispatch(toggleDrawer());
  }

  render() {
    const { classes } = this.props;

    const drawerContent = (
      <div>
        <Fragment forRoute="/tunes">
          <DrawerItems type="tunes" height={this.state.elementHeight} />
        </Fragment>
        <Fragment forRoute="/sets">
          <DrawerItems type="sets" height={this.state.elementHeight} />
        </Fragment>
      </div>
    );

    return (
      <div
        className={classes.drawerPaper}
        ref={element => (this.divRef = element)}
      >
        <Hidden mdUp>
          <Drawer
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
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
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
