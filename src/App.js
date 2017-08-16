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

const styles = {
  root: {
    width: '100%',
  }
};

class App extends Component {
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
          <Tabs style={styles.tabs} initialSelectedIndex={0}>
            <Tab value={0} label="home"/>
            <Tab value={1} label="about"/>
            <Tab value={2} label="contact"/>
            <Tab value={3} label="faq"/>
          </Tabs>
        </AppBar>
        <Fragment forRoute='/tunebook'><Tunebook /></Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(App);
