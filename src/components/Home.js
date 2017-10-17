import React, { Component } from "react";
import { TextField } from "material-ui";
import { connect } from "react-redux";
import store from "../store";
import { updateUserId } from "../actions/session";
import { Link } from "redux-little-router";

class Home extends Component {
  handleChange = userId => event => {
    store.dispatch(updateUserId(event.target.value));
  };

  render() {
    return (
      <div>
        <TextField
          id="userId"
          label="You seesion.org user id"
          value={this.props.userId}
          onChange={this.handleChange("userId")}
          margin="normal"
        />
        <Link href="/tunebook/tunes">Get me to my tunebook</Link>
      </div>
    );
  }
}

const mapSateToProps = state => {
  userId: state.session.userId;
};

export default connect(mapSateToProps)(Home);
