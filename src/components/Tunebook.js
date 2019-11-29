import EmptyState from "./EmptyState";
import { Route } from "react-router-dom";
import React from "react";
import Tune from "./Tune";
import { withRouter, Switch } from "react-router-dom";
function Tunebook(props) {
  const {
    match: { url }
  } = props;
  return (
    <div>
      <Switch>
        <Route path={`${url}/:tuneId`}>
          <Tune />
        </Route>
        <Route path={`${url}`}>
          <EmptyState />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(Tunebook);
