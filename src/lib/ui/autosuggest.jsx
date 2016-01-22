/**
 * @module st-react-autosuggest
 */
import React from "react";
import Autosuggest from "st-react-typeahead-component";

/**
 * This is the ui for the autosuggest. It requires a backing store as a property upon
 * being mounted.
 * @class AutosuggestUI
 */

class AutosuggestUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: this.props.autosuggestStore.getDisplayValue(this.props.initialSuggestion),
      options: [],
      currentlySelected: null,
      justSelected: false
    };
  }

  /**
   * Called when new properties are passed to this component
   * @param props new properties
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.initialSuggestion === this.props.initialSuggestion) {
      return;
    }
    this.setState({
      input: nextProps.autosuggestStore.getDisplayValue(nextProps.initialSuggestion),
      options: [],
      currentlySelected: null
    });
  }

  /**
   * This is automatically called by react and renders the autosuggest into the dom.
   * @method render
   */
  render() {
    var OptionTemplate = this.props.autosuggestStore.getSuggestionTemplate();
    return (
      <div className="typeahead-container">
        <Autosuggest
          ref="typeahead"
          inputValue={this.state.input}
          options={this.state.options}
          optionTemplate={OptionTemplate}
          onChange={this.handleChange.bind(this)}
          onOptionChange={this.handleOptionChange.bind(this)}
          onOptionClick={this.handleOptionClick.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onDropdownClose={this.onDropdownClose.bind(this)}
         />
      </div>

    );
  }

  handleChange(event) {
    var input = event.target.value;
    this.setInputValue(input);
    if (this.showWhen(input)) {
      this.props.autosuggestStore.getSuggestion(input, (error, suggestions) => {
        if (suggestions) {
          this.setOptions(suggestions);
        }
      });
    }
  }

  /**
   * Should we attempt to lookup suggestions
   *
   * @param inputText text from the auto-suggest input
   * @return boolean true if suggestions should be shown else false
   */
  showWhen(inputText) {
    return inputText.length > 2;
  }

  setInputValue(value) {
    this.setState({
      input: value
    });
  }

  setOptions(options) {
    this.setState({
      options: options
    });
  }

  onDropdownClose() {
    if (this.state.currentlySelected) {
      this.props.onSelected(this.state.currentlySelected);
      this.setState({
        currentlySelected: null,
        justSelected: true
      });
    }
  }

  handleOptionChange(event, option, index) {
    if (index === -1) {
      return;
    }
    this.setInputValue(this.props.autosuggestStore.getDisplayValue(option));
    this.setState({
      currentlySelected: option
    });
  }

  handleOptionClick(event, option) {
    this.setInputValue(this.props.autosuggestStore.getDisplayValue(option));
    this.props.onSelected(option);
    this.setState({
      justSelected: true
    });
  }

  onFocus(evt) {
    if (this.state.justSelected) {
      this.setState({
        justSelected: false
      });

      return;
    }

    var value = evt.target.value;
    this.setState({
      input: this.props.focusPlaceholderText,
      options: [],
      lastValueBeforeFocus: value
    });
  }

  onBlur(evt) {
    if (evt.target.value === this.props.focusPlaceholderText) {
      this.setState({
        input: this.state.lastValueBeforeFocus,
        options: []
      });
    }
  }
}

AutosuggestUI.propTypes = {
  /**
   * @attribute autosuggestStore
   * @required
   * @type {AutosuggestStore}
   */
  autosuggestStore: React.PropTypes.any.isRequired,

  /**
   * @attribute initialSuggestion
   * @type Suggestion
   */
  initialSuggestion: React.PropTypes.any,

  /**
   * @attribute focusPlaceholderText
   * @type String
   * @default ""
   */
  focusPlaceholderText: React.PropTypes.string,

  /**
   * @attribute onSelected
   * @type Function
   *   @param {Suggestion}
   * @example
   */
  onSelected: React.PropTypes.func

};

AutosuggestUI.defaultProps = {
  autosuggestStore: null,
  initialSuggestion: null,
  focusPlaceholderText: "",
  onSelected: (suggestion) => {}
};

export default AutosuggestUI;
