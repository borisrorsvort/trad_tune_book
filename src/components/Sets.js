import EmptyState from "./EmptyState";
import { Route } from "react-router-dom";
import React from "react";
import Set from "./Set";
import { withRouter, Switch } from "react-router-dom";

function Sets(props) {
  const {
    match: { url }
  } = props;
  return (
    <div>
      <Switch>
        <Route path={`${url}/:setId`}>
          <Set />
        </Route>
        <Route path={`${url}`}>
          <EmptyState />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(Sets);
