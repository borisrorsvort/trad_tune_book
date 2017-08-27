import React, { Component } from 'react';
import './App.css';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import { Fragment } from 'redux-little-router';
import Tunebook from './components/Tunebook';
import Sets from './components/Sets';
import { connect } from 'react-redux';
import { redirect } from './actions/router';

const styles = {
  root: {
    width: '100%',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
    const tabsHrefs = ['/', '/tunebook', '/sets'];
    this.props.redirect(tabsHrefs[value]);
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              TradTuneBook
            </Typography>
          </Toolbar>
          <Tabs value={this.state.selectedTab} onChange={this.handleChange}>
            <Tab value={0} label="home" />
            <Tab value={1} label="tunebook" />
            <Tab value={2} label="sets" />
          </Tabs>
        </AppBar>
        <Fragment forRoute="/tunebook">
          <Tunebook />
        </Fragment>
        <Fragment forRoute="/sets">
          <Sets />
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({ router: state.router });
const mapDispatchToProps = dispatch => ({
  redirect: href => {
    dispatch(redirect(href));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(App),
);
