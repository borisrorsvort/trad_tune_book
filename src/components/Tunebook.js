import React, { Component } from "react";
import Tune from "./Tune";
import { Fragment } from "redux-little-router";

class Tunebook extends Component {
  render() {
    return (
      <Fragment forRoute="/:tuneId">
        <Tune />
      </Fragment>
    );
  }
}

export default Tunebook;
