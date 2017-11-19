import React, { Component } from "react";
import store from "../store";
import { connect } from "react-redux";
import he from "he";
import SheetMusic from "./SheetMusic";
import { Link } from "redux-little-router";
import { fetchSet } from "../actions/sets";
import {
  withStyles,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from "material-ui";
import { commonStyles } from "../styles/common";
import PrintIcon from "material-ui-icons/Print";
import { TUNE_URL } from "../constants/actionTypes";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  settings: theme.mixins.gutters({
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }),
  iconBtn: {
    marginRight: "10px"
  },
  ...commonStyles(theme)
});

class Set extends Component {
  componentDidMount() {
    store.dispatch(fetchSet(this.props.userId, this.props.setId));
  }

  componentWillReceiveProps(nextProps) {
    const newSetId = nextProps.setId;
    if (this.props.setId !== newSetId) {
      store.dispatch(fetchSet(this.props.userId, newSetId));
    }
  }

  render() {
    const printUrl = `https://thesession.org/members/${this.props
      .userId}/sets/${this.props.setId}/sheetmusic?print=true`;
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
      this.props.currentSet === undefined ||
      this.props.currentSet.name === undefined
    ) {
      return null;
    }

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.settings} elevation={0}>
            {this.props.currentSet.settings.map(setting => {
              return <SheetMusic key={setting.id} tune={setting} />;
            })}
          </Paper>
        </Grid>
        <Grid item hidden={{ smDown: true }} md={4}>
          <Card className={classes.card}>
            <CardActions>
              <Button href={printUrl} target="_blank">
                <PrintIcon className={classes.iconBtn} />
                Print
              </Button>
            </CardActions>
          </Card>
          {this.props.currentSet.settings.map(setting => {
            return (
              <Card className={classes.card} key={setting.id}>
                <CardContent>
                  <Typography type="subheading" gutterBottom>
                    Setting {he.decode(setting.name)} ({setting.key})
                  </Typography>
                  <Typography type="caption">
                    by {setting.member.name} on {setting.date}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    dense
                    component={Link}
                    target="_blank"
                    href={`${TUNE_URL}${setting.id}`}
                  >
                    View on The Session.org
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  setId: state.router.params.setId,
  currentSet: state.sets.currentSet,
  userId: state.session.currentUser.id,
  isFetching: state.sets.currentSet.isFetching
});

export default connect(mapStateToProps)(withStyles(styles)(Set));
