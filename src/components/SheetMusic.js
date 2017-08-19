// eslint-disable-next-line import/no-webpack-loader-syntax
import ABCJS from 'exports-loader?ABCJS!script-loader!../../node_modules/abcjs/bin/abcjs_basic_2.3-min.js';
import React, { Component } from 'react';
import { withStyles, TextField } from 'material-ui';
import { abcReformatter } from '../helpers/abcHelper';

const abcRenderParams = {
  paddingtop: 50,
  paddingbottom: 50,
  paddingright: 50,
  paddingleft: 50,
};
const styles = theme => ({
  textField: {},
});

class SheetMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abc: abcReformatter(this.props.tune.abc),
    };
  }

  componentDidMount() {
    ABCJS.renderAbc(
      this.el,
      abcReformatter(this.state.abc),
      null,
      abcRenderParams,
    );
  }
  render() {
    const abcFormattedText = abcReformatter(this.state.abc);
    return (
      <div>
        <h3>
          {this.props.tune.key}
        </h3>
        <TextField
          disabled
          id="multiline-flexible"
          label="Abc version"
          multiline
          fullWidth
          rowsMax="100"
          value={abcFormattedText}
          className={this.props.classes.textField}
          margin="normal"
        />
        <div ref={el => (this.el = el)} />
      </div>
    );
  }
}

export default withStyles(styles)(SheetMusic);
