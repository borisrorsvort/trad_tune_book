import React, { Component } from "react";

import EmptyState from "./EmptyState";
import { Fragment } from "redux-little-router";
import Set from "./Set";

function Sets(props) {
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

export default Sets;
