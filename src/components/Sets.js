import React, { Component } from "react";

import EmptyState from "./EmptyState";
import { Fragment } from "redux-little-router";
import Set from "./Set";

class Sets extends Component {
  render() {
    return (
      <div>
        <Fragment forRoute="/:setId">
          <Set />
        </Fragment>
        <Fragment forRoute="/">
          <EmptyState />
        </Fragment>
      </div>
    );
  }
}

export default Sets;
