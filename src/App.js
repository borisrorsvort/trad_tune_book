import React, { Component } from 'react';
import './App.css';
import SplitPane from 'react-split-pane';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';


// eslint-disable-next-line import/no-webpack-loader-syntax
import ABCJS from 'exports-loader?ABCJS!script-loader!./../node_modules/abcjs/bin/abcjs_basic_2.3-min.js';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tune: 'X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n'
    }
  }

  componentDidMount() {
    this.renderMusicSheet(this.state.tune)
  }

  renderMusicSheet(tune) {
    ABCJS.renderAbc('music-sheet', tune)
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
          <Tabs style={styles.tabs} initialSelectedIndex={0}>
            <Tab value={0} label="home"/>
            <Tab value={1} label="about"/>
            <Tab value={2} label="contact"/>
            <Tab value={3} label="faq"/>
          </Tabs>
        </AppBar>
        <SplitPane split="vertical" minSize={250}>
          <div>arsuiet</div>
          <div id='music-sheet'></div>
        </SplitPane>
      </div>
    );
  }
}

export default withStyles(styles)(App);
