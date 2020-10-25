import "./App.css";
import Joyride from "react-joyride";

import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";

import Tunebook from "./components/Tunebook";
import { connect, useDispatch } from "react-redux";
import { layoutStyles } from "./styles/layout";
import { logout } from "./actions/session";

import { toggleDrawer, toggleFilters } from "./actions/ui";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import NavDrawer from "./components/NavDrawer";
import { steps, stepsStyles } from "./helpers/welcomeTour";
import { useCookies } from "react-cookie";
import AppBarContent from "./components/AppBarContent";
import { fetchSets } from "./actions/sets";
import { fetchTuneBook } from "./actions/tuneBook";
import { CircularProgress } from "@material-ui/core";
import { withSnackbar } from "notistack";

function App(props) {
  const [cookies, setCookie] = useCookies();
  const dispatch = useDispatch();

  const {
    classes,
    showDrawer,
    enqueueSnackbar,
    closeSnackbar,
    match: {
      params: { folder, userId }
    }
  } = props;

  useEffect(() => {
    if (!cookies.hadConfigTour) {
      setCookie("hadConfigTour", true);
    }
    const snack = enqueueSnackbar("Syncing tunebook!", {
      variant: "success",
      persist: true,
      action: <CircularProgress size={20} />
    });

    Promise.all([
      dispatch(fetchSets(userId)),
      dispatch(fetchTuneBook(userId))
    ]).finally(() => {
      closeSnackbar(snack);
    });
  }, [cookies, setCookie, userId, closeSnackbar, enqueueSnackbar, dispatch]);

  const handleDrawerToggle = () => {
    props.toggleDrawer();
  };
  const handleToggleFilters = () => {
    props.toggleFilters();
  };

  return (
    <div className={classes.root}>
      <Joyride
        steps={steps}
        continuous={true}
        showProgress={true}
        run={!cookies.hadConfigTour}
        disableScrolling={true}
        styles={stepsStyles}
      />
      <AppBar className={classes.appBar}>
        <AppBarContent
          folder={folder}
          onToggleFilters={handleToggleFilters}
          onDrawerToggle={handleDrawerToggle}
        />
      </AppBar>
      <NavDrawer onClose={handleDrawerToggle} open={showDrawer} />
      <div className={classes.content}>
        <Tunebook userId={userId} folder={folder} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  showDrawer: state.ui.showDrawer
});

export default withRouter(
  connect(mapStateToProps, { logout, toggleFilters, toggleDrawer })(
    withSnackbar(withStyles(layoutStyles)(App))
  )
);
