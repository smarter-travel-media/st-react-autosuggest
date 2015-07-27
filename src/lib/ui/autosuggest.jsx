import React from "react";
import Autosuggest from "react-autosuggest";

var AutosuggestComponent = React.createClass({
  propTypes: {
    /**
     * @type {AutosuggestStore}
     */
    autosuggestStore: React.PropTypes.any.isRequired
  },

  render: function () {
    return (
      <Autosuggest {...this.props} suggestions={this.props.autosuggestStore.getSuggestion.bind(this.props.autosuggestStore)} />
    );
  }
});

export default AutosuggestComponent;
