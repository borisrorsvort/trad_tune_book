import { SIDEBAR_WIDTH } from "../constants/layout";

export const layoutStyles = theme => ({
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
    position: "fixed",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
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
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    width: "100%",
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
      marginLeft: SIDEBAR_WIDTH
    },
    appBar: {
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
      marginLeft: SIDEBAR_WIDTH
    }
  }
});
