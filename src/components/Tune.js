import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  withStyles
} from "material-ui";
import React, { Component } from "react";

import { Link } from "redux-little-router";
import SheetMusic from "./SheetMusic";
import { TUNE_URL } from "../constants/actionTypes";
import { connect } from "react-redux";
import { fetchTune } from "../actions/tuneBook";
import he from "he";
import store from "../store";

const styles = theme => ({
  card: {
    margin: `${theme.spacing.unit * 10}px 0`
  },
  settings: theme.mixins.gutters({
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }),
  flex: {
    flex: 1
  },
  title: {
    textAlign: "center",
    marginTop: theme.spacing.unit * 2,
    fontWeight: 100
  }
});

class Tune extends Component {
  componentDidMount() {
    store.dispatch(fetchTune(this.props.tuneId));
  }

  componentWillReceiveProps(nextProps) {
    const newTuneId = nextProps.tuneId;
    if (this.props.tuneId !== newTuneId) {
      store.dispatch(fetchTune(newTuneId));
    }
  }

  render() {
    const { classes } = this.props;

    if (this.props.isFetching) {
      return (
        <Grid container spacing={24}>
          <Grid item xs={12} md={8}>
            <CircularProgress />
          </Grid>
        </Grid>
      );
    }

    if (
      this.props.currentTune === undefined ||
      this.props.currentTune.name === undefined
    ) {
      return null;
    }

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} md={8}>
            <Typography className={this.props.classes.title} variant="display2">
              {he.decode(this.props.currentTune.name)}
            </Typography>
          </Grid>
        </Grid>
        {this.props.currentTune.settings.map(setting => {
          return (
            <Grid container spacing={24} key={setting.id}>
              <Grid item xs={12} md={8}>
                <SheetMusic tune={setting} type={this.props.currentTune.type} />
              </Grid>
              <Grid item hidden={{ smDown: true }} md={4}>
                <Card className={classes.card} key={setting.id}>
                  <CardContent>
                    <Typography variant="subheading" gutterBottom>
                      Setting #{setting.id} ({setting.key})
                    </Typography>
                    <Typography variant="caption">
                      by {setting.member.name} on {setting.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      target="_blank"
                      href={`${TUNE_URL}${this.props.currentTune.id}#setting${
                        setting.id
                      }`}
                    >
                      View on The Session.org
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tuneId: state.router.params.tuneId,
  currentTune: state.tunes.currentTune,
  isFetching: state.tunes.currentTune.isFetching
});

export default connect(mapStateToProps)(withStyles(styles)(Tune));
