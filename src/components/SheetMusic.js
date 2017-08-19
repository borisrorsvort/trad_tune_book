import React, { Component } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ABCJS from 'exports-loader?ABCJS!script-loader!../../node_modules/abcjs/bin/abcjs_basic_2.3-min.js';

class SheetMusic extends Component {
  componentDidMount() {
    ABCJS.renderAbc(this.el, this.props.tune.abc);
  }
  render() {
    return (
      <div>
        <h3>
          {this.props.tune.key}
        </h3>
        <code>
          {this.props.tune.abc}
        </code>
        <div ref={el => (this.el = el)} />
      </div>
    );
  }
}

export default SheetMusic;
