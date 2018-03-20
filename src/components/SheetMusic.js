import React, { Component } from "react";

import { abcReformatter } from "../helpers/abcHelper";
// eslint-disable-next-line import/no-webpack-loader-syntax
//import abcjs from "exports-loader?ABCJS!script-loader!../../node_modules/abcjs/bin/abcjs_basic_latest-min.js";
import abcjs from "abcjs";
import abcjsMidi from "abcjs/midi";
import he from "he";
import reactDimensions from "react-dimensions";
import { withStyles } from "material-ui";

const styles = theme => ({
  root: {
    margin: "20px auto",

    maxWidth: "640px",
    borderBottom: "1px solid #ccc",
    "&:last-child": {
      border: "none",
      marginBottom: 0,
      paddingBottom: 0
    },
    [theme.breakpoints.up("md")]: {
      padding: "20px"
    }
  }
});

class SheetMusic extends Component {
  renderAbc(width) {
    const props = {
      paddingright: 0,
      paddingleft: 0,
      responsive: "resize"
    };

    abcjs.renderAbc(
      this.el,
      abcReformatter(this.props.tune, this.props.type, this.title()),
      {},
      props,
      {}
    );
  }

  renderMidi() {
    abcjsMidi.renderMidi(
      this.midi,
      abcReformatter(this.props.tune, this.props.type, this.title()),
      {},
      {
        inlineControls: {
          selectionToggle: false,
          loopToggle: false,
          standard: true,
          tempo: false,
          startPlaying: false
        }
      },
      {}
    );
  }

  title() {
    return this.props.tune.name
      ? `${he.decode(this.props.tune.name)} (${this.props.tune.key})`
      : this.props.tune.key;
  }

  componentWillReceiveProps(nextProps) {
    const newWidth = nextProps.containerWidth;
    if (this.props.containerWidth !== newWidth) {
      this.renderAbc(this.props.containerWidth);
      this.renderMidi(this.props.containerWidth);
    }
  }

  componentDidMount() {
    this.renderAbc(this.props.containerWidth);
    this.renderMidi(this.props.containerWidth);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div ref={el => (this.el = el)} />
        <div ref={el => (this.midi = el)} />
      </div>
    );
  }
}

export default withStyles(styles)(reactDimensions()(SheetMusic));
