import { Button, Grid, Paper, Typography, withStyles } from "material-ui";
import React, { Component } from "react";

import BodyClassName from "react-body-classname";
import { Link } from "redux-little-router";
import NameAutoComplete from "./NameAutoComplete";
import { connect } from "react-redux";
import logoUrl from "../images/logo.svg";

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
  },
  home: {
    background: theme.palette.primary[500]
  },
  logo: {
    maxWidth: "100%",
    margin: "0 auto 40px",
    display: "block"
  },
  title: {
    fontSize: 21,
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 1.5,
    color: "white",
    opacity: 0.8
  },
  login: {
    alignSelf: "flex-start"
  }
});

function Home(props) {
  const { classes, userName } = props;
  return (
    <BodyClassName className={classes.home}>
      <Grid
        container
        spacing={24}
        alignItems="center"
        justify="center"
        direction="row"
        className={classes.container}
      >
        <Grid item xs={12} md={12}>
          <img src={logoUrl} alt="Foinn app" className={classes.logo} />
          <h1 className={classes.title}>
            Browse your tunes and sets from Thessession.org <br />
            <small>The ideal session companion</small>
          </h1>
        </Grid>
        <Grid item xs={12} md={4} className={classes.login}>
          <Paper className={classes.paper} elevation={8}>
            <Typography variant="subheading" gutterBottom>
              To start, select your{" "}
              <a
                href="https://thesession.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                TheSession.org
              </a>{" "}
              user name.
            </Typography>
            <NameAutoComplete userName={userName} />
            {userName && (
              <Button
                href="/tunebook/tunes"
                className={classes.button}
                component={Link}
                variant="raised"
                color="primary"
              >
                Open tunebook
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </BodyClassName>
  );
}

const mapStateToProps = state => ({
  userName:
    state.session.currentUser !== undefined &&
    state.session.currentUser.name !== undefined
      ? state.session.currentUser.name
      : ""
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
