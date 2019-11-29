import { Drawer, Hidden, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import DrawerItems from "./DrawerItems";
import { connect } from "react-redux";
import { fetchSets } from "../actions/sets";
import { fetchTuneBook } from "../actions/tuneBook";
import { layoutStyles } from "../styles/layout";
import store from "../store";
import { toggleDrawer } from "../actions/ui";

class DrawerResponsive extends Component {
  state = {
    elementHeight: 0
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
    const {
      classes,
      folder,
      match: { url }
    } = this.props;
    const items =
      folder === "tunes" ? (
        <DrawerItems type="tunes" height={this.state.elementHeight} />
      ) : (
        <DrawerItems type="sets" height={this.state.elementHeight} />
      );
    const drawerContent = (
      <div>
        <Switch>
          <Route path={`${url}/:tuneId`}>{items}</Route>
          <Route path={`${url}`}>{items}</Route>
        </Switch>
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

export default withRouter(
  connect(mapStateToProps)(withStyles(layoutStyles)(DrawerResponsive))
);
