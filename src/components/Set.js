import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  withStyles
} from "material-ui";
import React, { Component } from "react";

import { Link } from "redux-little-router";
import PrintIcon from "material-ui-icons/Print";
import SheetMusic from "./SheetMusic";
import { TUNE_URL } from "../constants/actionTypes";
import { commonStyles } from "../styles/common";
import { connect } from "react-redux";
import { fetchSet } from "../actions/sets";
import he from "he";
import store from "../store";

const styles = theme => ({
  card: {
    margin: `${theme.spacing.unit * 10}px 0`
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
  mainTitle: {
    textAlign: "center",
    marginTop: theme.spacing.unit * 2,
    fontWeight: 100
  },
  printButton: {
    textAlign: "center"
  }
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
    const printUrl = `https://thesession.org/members/${
      this.props.userId
    }/sets/${this.props.setId}/sheetmusic?print=true`;
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
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} md={8}>
            <Typography
              className={this.props.classes.mainTitle}
              variant="display2"
            >
              {he.decode(this.props.currentSet.name)}
            </Typography>
            <p className={classes.printButton}>
              <Button href={printUrl} target="_blank">
                <PrintIcon className={classes.iconBtn} />
                Print
              </Button>
            </p>
          </Grid>
        </Grid>
        <div className={classes.settings}>
          {this.props.currentSet.settings.map(setting => {
            return (
              <Grid container spacing={24}>
                <Grid item xs={12} md={8}>
                  <SheetMusic key={setting.id} tune={setting} />;
                </Grid>
                <Grid item xs={12} md={4} hidden={{ smDow: true }}>
                  <Card className={classes.card} key={setting.id}>
                    <CardContent>
                      <Typography variant="subheading" gutterBottom>
                        Setting {he.decode(setting.name)} ({setting.key})
                      </Typography>
                      <Typography variant="caption">
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
                </Grid>
              </Grid>
            );
          })}
        </div>
      </div>
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
