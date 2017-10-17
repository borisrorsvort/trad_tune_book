import React, { Component } from "react";
import { TextField, withStyles, Paper, Button, Typography } from "material-ui";
import { connect } from "react-redux";
import store from "../store";
import { updateUserId } from "../actions/session";
import { Link } from "redux-little-router";

const styles = theme => ({
  paper: {
    width: "50%",
    margin: "auto",
    padding: "20px"
  },
  input: {
    width: "100%",
    marginBottom: theme.spacing.unit
  },
  button: {
    color: "white"
  }
});

class Home extends Component {
  handleChange = userId => event => {
    store.dispatch(updateUserId(event.target.value));
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={0}>
        <Typography type="subheader" gutterBottom>
          To start, you must fill in you TheSession.org user id.
        </Typography>
        <TextField
          id="userId"
          label="You seesion.org user id"
          className={classes.input}
          value={this.props.userId}
          onChange={this.handleChange("userId")}
          margin="normal"
        />
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

const mapSateToProps = state => ({
  userId: state.session.userId
});

export default connect(mapSateToProps)(withStyles(styles)(Home));
