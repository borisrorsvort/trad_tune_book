import { SIDEBAR_WIDTH } from "../constants/layout";

export const layoutStyles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    position: "fixed",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  flex: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    zIndex: theme.zIndex.drawer - 1,
    width: SIDEBAR_WIDTH,
    top: 0,
    left: 0,
    height: "100vh",
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
  logo: {
    position: "relative",
    transform: "translateY(-2px)"
  },
  greetings: {
    marginRight: theme.spacing.unit,
    opacity: 0.5,
    display: "inline-block"
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
      marginTop: 64,
      marginLeft: SIDEBAR_WIDTH
    },
    drawerPaper: {
      height: "calc(100vh - 64px)",
      top: 64
    }
  }
});
