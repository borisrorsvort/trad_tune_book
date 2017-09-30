import React, { Component } from "react";
import store from "../store";
import { fetchTune } from "../actions/tuneBook";
import { connect } from "react-redux";
import SheetMusic from "./SheetMusic";
import he from "he";
import { Link } from "redux-little-router";
import {
  withStyles,
  Grid,
  Paper,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText
} from "material-ui";
import { commonStyles } from "../styles/common";
import PrintIcon from "material-ui-icons/Print";
import { TUNE_URL } from "../constants/actionTypes";

const styles = theme => ({
  settings: theme.mixins.gutters({
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }),
  flex: {
    flex: 1
  },
  ...commonStyles(theme)
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

    if (
      this.props.currentTune === undefined ||
      this.props.currentTune.name === undefined
    ) {
      return null;
    }

    return (
      <div className={classes.content}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Paper className={this.props.classes.settings} elevation={1}>
              <Toolbar disableGutters>
                <Typography
                  type="title"
                  color="inherit"
                  className={this.props.classes.flex}
                >
                  {he.decode(this.props.currentTune.name)}
                </Typography>
              </Toolbar>
              {this.props.currentTune.settings.map(setting => {
                return <SheetMusic key={setting.id} tune={setting} />;
              })}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={1}>
              <List>
                {this.props.currentTune.settings.map(setting => {
                  return (
                    <ListItem key={setting.id} button>
                      <ListItemText
                        primary={`Setting ${setting.id}`}
                        secondary={setting.key}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tuneId: state.router.params.tuneId,
  currentTune: state.tunebook.currentTune
});

export default connect(mapStateToProps)(withStyles(styles)(Tune));
