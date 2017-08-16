import React, { Component } from 'react';
import './App.css';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import { Fragment } from 'redux-little-router';
import Tunebook from './components/Tunebook'
import { connect } from 'react-redux';
import { redirect } from './actions/router';

const styles = {
  root: {
    width: '100%',
  }
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
    if (value === 0) {
      this.props.redirect('/');
    } else if (value === 1) {
      this.props.redirect('/tunebook');
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              TradTuneBook
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
          <Tabs value={this.state.selectedTab} style={styles.tabs} onChange={this.handleChange}>
            <Tab value={0} label="home"/>
            <Tab value={1} label="tunebook"/>
          </Tabs>
        </AppBar>
        <Fragment forRoute='/tunebook'><Tunebook /></Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({ router: state.router });
const mapDispatchToProps = (dispatch) => ({
  redirect: (href) => {
    dispatch(redirect(href))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
