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
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Button
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
  flex: {
    flex: 1
  },
  ...commonStyles(theme)
});

class Set extends Component {
  componentDidMount() {
    store.dispatch(fetchSet("63117", this.props.setId));
  }

  componentWillReceiveProps(nextProps) {
    const newSetId = nextProps.setId;
    if (this.props.setId !== newSetId) {
      store.dispatch(fetchSet("63117", newSetId));
    }
  }

  render() {
    const printUrl = `https://thesession.org/members/63117/sets/${this.props
      .setId}/sheetmusic?print=true`;
    const { classes } = this.props;

    if (
      this.props.currentSet === undefined ||
      this.props.currentSet.name === undefined
    ) {
      return null;
    }

    return (
      <div className={classes.content}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Paper className={this.props.classes.settings} elevation={0}>
              <Toolbar disableGutters>
                <Typography
                  type="title"
                  color="inherit"
                  className={this.props.classes.flex}
                >
                  {he.decode(this.props.currentSet.name)}
                </Typography>
                <a href={printUrl} target="_blank">
                  <IconButton>
                    <PrintIcon />
                  </IconButton>
                </a>
              </Toolbar>
              {this.props.currentSet.settings.map(setting => {
                return <SheetMusic key={setting.id} tune={setting} />;
              })}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            {this.props.currentSet.settings.map(setting => {
              return (
                <Card className={this.props.classes.card}>
                  <CardContent>
                    <Typography type="subheader" gutterBottom>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  setId: state.router.params.setId,
  currentSet: state.sets.currentSet
});

export default connect(mapStateToProps)(withStyles(styles)(Set));
