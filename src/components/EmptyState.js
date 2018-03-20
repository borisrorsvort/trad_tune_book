import React, { Component } from "react";

import { withStyles } from "material-ui";

const styles = () => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "center"
  }
});

function EmptyState(props) {
  return (
    <div className={props.classes.root}>
      Please select a item from the list
    </div>
  );
}

export default withStyles(styles)(EmptyState);
