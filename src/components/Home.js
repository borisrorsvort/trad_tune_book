import React, { Component } from "react";
import { withStyles, Paper, Button, Typography } from "material-ui";
import { Link } from "redux-little-router";
import NameAutoComplete from "./NameAutoComplete";

const styles = theme => ({
  paper: {
    width: "50%",
    margin: "auto",
    padding: "20px"
  },
  button: {
    color: "white"
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={0}>
        <Typography type="subheader" gutterBottom>
          To start, you must fill in you TheSession.org user id.
        </Typography>
        <NameAutoComplete />
        <Button
          href="/tunebook/tunes"
          className={classes.button}
          component={Link}
          raised
          color="primary"
        >
          See my tunebook
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(Home);
