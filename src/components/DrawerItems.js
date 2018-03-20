import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import { ListItem, ListItemIcon, ListItemText, withStyles } from "material-ui";
import React, { Component } from "react";

import MusicNote from "material-ui-icons/MusicNote";
import _isEmpty from "lodash/isEmpty";
import classNames from "classnames";
import { connect } from "react-redux";
import { fetchSets } from "../actions/sets";
import { fetchTuneBook } from "../actions/tuneBook";
import he from "he";
import { redirect } from "../actions/router";
import store from "../store";
import { toggleDrawer } from "../actions/ui";
import { tuneOrSetUrl } from "../helpers/routerHelper";

const styles = theme => ({
  activeListItem: {
    background: "#ddd"
  }
});

class DrawerItems extends Component {
  handleClick = item => _e => {
    const href = tuneOrSetUrl(item.id, this.props.type);
    store.dispatch(redirect(href));
    store.dispatch(toggleDrawer(true));
  };

  componentWillReceiveProps() {
    this.list && this.list.forceUpdateGrid();
  }

  isActive(id) {
    const { router: { params } } = this.props;
    const itemId = id.toString();
    return params.setId === itemId || params.tuneId === itemId;
  }

  _isRowLoaded = ({ index }) => {
    return !!this.props.items[index];
  };

  _loadMoreRows = () => {
    const sets = this.props.type === "sets";
    const nextPage = this.props.meta.page++;

    if (sets) {
      store.dispatch(fetchSets(this.props.userId, nextPage, true));
    } else {
      store.dispatch(fetchTuneBook(this.props.userId, nextPage, true));
    }
  };

  _rowRenderer = ({ index, key, style }) => {
    const item = this.props.items[index];
    const itemName =
      item &&
      (item.name.length > 40
        ? he.decode(item.name).substring(0, 40) + "..."
        : he.decode(item.name));

    if (!item) {
      return (
        <div style={style} key={index}>
          Loading
        </div>
      );
    }
    return (
      <ListItem
        style={style}
        key={index}
        className={classNames({
          [`${this.props.classes.activeListItem}`]: this.isActive(item.id)
        })}
        button
        onClick={this.handleClick(item)}
      >
        <ListItemIcon>
          <MusicNote />
        </ListItemIcon>
        <ListItemText primary={itemName} />
      </ListItem>
    );
  };

  render() {
    const { meta, height, isSets } = this.props;

    if (_isEmpty(meta)) {
      return null;
    }

    return (
      <InfiniteLoader
        isRowLoaded={this._isRowLoaded}
        loadMoreRows={this._loadMoreRows}
        rowCount={meta.total}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={el => (this.list = el)}
                height={height || 0}
                onRowsRendered={onRowsRendered}
                rowCount={meta.total}
                rowHeight={isSets ? 80 : 60}
                rowRenderer={this._rowRenderer}
                threshold={300}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

const mapStateToProps = (state, props) => {
  const sets = props.type === "sets";

  return {
    items: sets ? state.sets.sets : state.tunes.tunes,
    meta: sets ? state.sets.meta : state.tunes.meta,
    router: state.router,
    userId: state.session.currentUser.id,
    isSets: props.type === "sets"
  };
};

export default connect(mapStateToProps)(withStyles(styles)(DrawerItems));
