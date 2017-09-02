// eslint-disable-next-line import/no-webpack-loader-syntax
import ABCJS from 'exports-loader?ABCJS!script-loader!../../node_modules/abcjs/bin/abcjs_basic_2.3-min.js';
import React, { Component } from 'react';
import { withStyles, Typography } from 'material-ui';
import { abcReformatter } from '../helpers/abcHelper';
import he from 'he';
import reactDimensions from 'react-dimensions';
import { BorderBottom } from 'material-ui-icons';

const styles = theme => ({
  root: {
    margin: '10px 0',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
    '&:last-child': {
      border: 'none',
      marginBottom: 0,
      paddingBottom: 0
    }
  }
});

class SheetMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abc: abcReformatter(this.props.tune.abc)
    };
  }

  renderAbc(width) {
    const props = {
      scale: 0.9,
      staffWidth: 0,
      paddingright: 0,
      paddingleft: 0
    };

    ABCJS.renderAbc(this.el, abcReformatter(this.state.abc), {}, props, {});
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
    const title = this.props.tune.name
      ? `${he.decode(this.props.tune.name)} (${this.props.tune.key})`
      : this.props.tune.key;
    return (
      <div className={this.props.classes.root}>
        <Typography type="subheading" gutterBottom>
          {title}
        </Typography>
        <div ref={el => (this.el = el)} />
      </div>
    );
  }
}

export default withStyles(styles)(reactDimensions()(SheetMusic));
