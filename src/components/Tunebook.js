import React, { Component } from "react";

import EmptyState from "./EmptyState";
import { Fragment } from "redux-little-router";
import Tune from "./Tune";

class Tunebook extends Component {
  render() {
    return (
      <div>
        <Fragment forRoute="/:tuneId">
          <Tune />
        </Fragment>
        <Fragment forRoute="/">
          <EmptyState />
        </Fragment>
      </div>
    );
  }
}

export default Tunebook;
