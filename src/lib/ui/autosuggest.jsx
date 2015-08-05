/**
 * @module st-react-autosuggest
 */
import React from "react";
import Autosuggest from "react-autosuggest";

/**
 * This is the ui for the autosuggest. It requires a backing store as a property upon
 * being mounted. Any other properties to its underlying component react-autosuggest
 * will be passed along.
 * @class AutosuggestUI
 */
var AutosuggestComponent = React.createClass({
  propTypes: {
    /**
     * @attribute autosuggestStore
     * @required
     * @type {AutosuggestStore}
     */
    autosuggestStore: React.PropTypes.any.isRequired
  },

  /**
   * This is automatically called by react and renders the autosuggest into the dom.
   * @method render
   */
  render: function () {
    return (
      <Autosuggest {...this.props} suggestions={this.props.autosuggestStore.getSuggestion.bind(this.props.autosuggestStore)} />
    );
  }
});

export default AutosuggestComponent;
