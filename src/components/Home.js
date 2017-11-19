import React, { Component } from "react";
import { withStyles, Paper, Button, Typography, Grid } from "material-ui";
import { Link } from "redux-little-router";
import NameAutoComplete from "./NameAutoComplete";

const styles = theme => ({
  paper: {
    margin: "0 auto",
    padding: "20px"
  },
  button: {
    color: "white",
    marginTop: theme.spacing.unit * 2
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={24}
        alignItems="center"
        justify="center"
        direction="row"
      >
        <Grid item xs={12} md={8}>
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
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
