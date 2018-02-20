import { Button, Grid, Paper, Typography, withStyles } from "material-ui";
import React, { Component } from "react";

import { Link } from "redux-little-router";
import NameAutoComplete from "./NameAutoComplete";
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    height: "100vh"
  },
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
    const { classes, userName } = this.props;
    return (
      <Grid
        container
        spacing={24}
        alignItems="center"
        justify="center"
        direction="row"
        className={classes.container}
      >
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper} elevation={8}>
            <Typography type="subheading" gutterBottom>
              To start, select in your TheSession.org user name.
            </Typography>
            <NameAutoComplete userName={userName} />
            {userName && (
              <Button
                href="/tunebook/tunes"
                className={classes.button}
                component={Link}
                raised
                color="primary"
              >
                Open tunebook
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  userName:
    state.session.currentUser !== undefined &&
    state.session.currentUser.name !== undefined
      ? state.session.currentUser.name
      : ""
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
