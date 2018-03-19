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
    store.dispatch(toggleDrawer());
  };

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
        <ListItemText primary={he.decode(item.name)} />
      </ListItem>
    );
  };

  render() {
    const { classes, meta, height } = this.props;

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
                ref={registerChild}
                height={400}
                onRowsRendered={onRowsRendered}
                rowCount={meta.total}
                rowHeight={48}
                rowRenderer={this._rowRenderer}
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
    userId: state.session.currentUser.id
  };
};

export default connect(mapStateToProps)(withStyles(styles)(DrawerItems));
