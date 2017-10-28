// eslint-disable-next-line import/no-webpack-loader-syntax
import ABCJS from "exports-loader?ABCJS!script-loader!../../node_modules/abcjs/bin/abcjs_basic_latest-min.js";
import React, { Component } from "react";
import { withStyles } from "material-ui";
import { abcReformatter } from "../helpers/abcHelper";
import he from "he";
import reactDimensions from "react-dimensions";

const styles = theme => ({
  root: {
    margin: "10px 0",
    padding: "10px 0",
    borderBottom: "1px solid #ccc",
    "&:last-child": {
      border: "none",
      marginBottom: 0,
      paddingBottom: 0
    }
  }
});

class SheetMusic extends Component {
  renderAbc(width) {
    const props = {
      paddingright: 20,
      paddingleft: 0,
      responsive: "resize"
    };

    ABCJS.renderAbc(
      this.el,
      abcReformatter(this.props.tune, this.props.type, this.title()),
      {},
      props,
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
    }
  }

  componentDidMount() {
    this.renderAbc(this.props.containerWidth);
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div ref={el => (this.el = el)} />
      </div>
    );
  }
}

export default withStyles(styles)(reactDimensions()(SheetMusic));
