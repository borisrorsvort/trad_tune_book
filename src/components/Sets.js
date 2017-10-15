import React, { Component } from "react";
import Set from "./Set";
import { Fragment } from "redux-little-router";

class Sets extends Component {
  render() {
    return (
      <Fragment forRoute="/:setId">
        <Set />
      </Fragment>
    );
  }
}

export default Sets;
