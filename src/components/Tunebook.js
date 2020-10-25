import { Route } from "react-router-dom";
import Fuse from "fuse.js";
import React from "react";
import { fetchTuneBook } from "../actions/tuneBook";
import { connect } from "react-redux";
import Tune from "./Tune";
import { withRouter } from "react-router-dom";
import TuneList from "./TuneList";
import PageLoading from "./PageLoading";
import FiltersDrawer from "./FiltersDrawer";
import TuneFiltersForm from "./FiltersForm/TuneFiltersForm";
import { withSnackbar } from "notistack";
import { fuseoptions } from "../helpers/searchHelper";
import { fetchSets } from "../actions/sets";

function Tunebook(props) {
  const {
    match: { url },
    items,
    isFetching,
    filters
  } = props;

  const fuse = new Fuse(items, fuseoptions);
  let filteredTunes = filters.search
    ? fuse.search(filters.search || "").map((item) => item.item)
    : items;

  const withType = filteredTunes.filter(
    (item) => !filters.tuneType || item.type === filters.tuneType
  );

  return (
    <div>
      {isFetching ? <PageLoading /> : <TuneList items={withType} />}
      <FiltersDrawer>
        <TuneFiltersForm />
      </FiltersDrawer>
      <Route path={`${url}/:tuneId?`}>
        <Tune referrer={url} />
      </Route>
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return {
    items: props.folder === "tunes" ? state.tunes.tunes : state.sets.sets,
    isFetching: state.tunes.isFetching,
    userChanged: state.session.currentUser.id !== props.userId,
    filters: state.ui.tuneFilters
  };
};

export default connect(mapStateToProps, { fetchTuneBook, fetchSets })(
  withSnackbar(withRouter(Tunebook))
);
