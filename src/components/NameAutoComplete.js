import React, { Component } from "react";
import { connect } from "react-redux";
import { MenuItem } from "material-ui/Menu";
import { TextField, withStyles, Paper } from "material-ui";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { updateCurrentUser, fetchUserId } from "../actions/session";
import store from "../store";

const styles = theme => ({
  suggestionsContainer: {
    position: "relative",
    zIndex: 999
  },
  suggestionsContainerOpen: {
    position: "absolute",
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
});

function renderInput(inputProps) {
  const { classes, autoFocus, value, ref, ...other } = inputProps;

  return (
    <TextField
      autoFocus={autoFocus}
      value={value}
      inputRef={ref}
      InputProps={{
        ...other
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  store.dispatch(updateCurrentUser(suggestion));
  return suggestion.name;
}

class NameAutoComplete extends Component {
  state = {
    value: this.props.userName,
    selectedSuggestion: {},
    suggestions: []
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    if (value.length < 4) {
      return false;
    } else {
      fetchUserId(value).then(data => {
        if (data !== undefined) {
          this.setState({ suggestions: data.data.members });
        } else {
          return [];
        }
      });
    }
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <Autosuggest
        theme={{
          container: classes.suggestionsContainer,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          placeholder: "Search a country (start with a)",
          value: this.state.value,
          onChange: this.handleChange
        }}
      />
    );
  }
}

const mapSateToProps = state => ({
  userName:
    state.session.currentUser !== undefined
      ? state.session.currentUser.name
      : ""
});

export default connect(mapSateToProps)(withStyles(styles)(NameAutoComplete));
