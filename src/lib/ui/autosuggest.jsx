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


class AutosuggestComponent extends React.Component {

  constructor(props) {
    super(props);
    this.originalShowWhen = this.props.showWhen;
    this.wrappedProps = this.wrapProps(this.props);
    this.lastValue = this.valueFromProps(this.props);
  }

  /**
   * Called when new properties are passed to this component
   * @param props new properties
     */
  componentWillReceiveProps(nextProps) {
    this.wrappedProps = this.wrapProps(nextProps);
    this.lastValue = this.valueFromProps(nextProps);
  }

  /**
   * This is automatically called by react and renders the autosuggest into the dom.
   * @method render
   */
  render() {
    return (
      <Autosuggest {...this.wrappedProps} suggestions={this.props.autosuggestStore.getSuggestion.bind(this.props.autosuggestStore)} />
    );
  }

  /**
   *
   * @param props
   * @returns String
     */
  valueFromProps(props) {
    if (props.value) {
      return props.value;
    }

    if (props.inputAttributes && props.inputAttributes.value) {
      return props.inputAttributes.value;
    }

    return "";
  }

  /**
   * Wraps the props object method of intrests with local method
   * @returns {{}}
   */
  wrapProps(propsToWrap) {
    var wrappedProps = {};

    for (var propName in propsToWrap) {
      if (propsToWrap.hasOwnProperty(propName)) {
        wrappedProps[propName] = propsToWrap[propName];
      }
    }

    //wrapped the methods of interests
    wrappedProps.showWhen = this.showWhen.bind(this);
    if (!wrappedProps.inputAttributes) {
      wrappedProps.inputAttributes = {};
    }

    if (this.props.focusPlaceholder) {
      wrappedProps.inputAttributes.onFocus = this.onFocus;
      wrappedProps.inputAttributes.onBlur = this.onBlur;
    }

    return wrappedProps;
  }


  /**
   * Wrapper method to prevent suggestion from showing if the underlying value hasn't changed.
   * This is added to show the auto suggest only if input text is changed.
   * Underlying auto-suggest tries to suggest even when input is focused and that can lead to unnecessary n/w call if
   * the input field is pre-populated.
   * @see <a href=""></a>
   *
   * @param inputText text from the auto-suggest input
   * @return boolean true if suggestions should be shown else false
   */
  showWhen(inputText) {
    if (this.props.suggestionsOnlyOnInputChange === true) {
      if (inputText === this.lastValue) {
        return false;
      }
    }

    return this.originalShowWhen(inputText);
  }

  onFocus(evt) {
    this.lastValueBeforeFocus = evt.target.value;
    this.setState({
      value: this.props.focusPlaceholderText
    });
  }

  onBlur(evt) {
    if (evt.target.value === this.props.focusPlaceholderText) {
      this.setState({
        value: this.lastValueBeforeFocus
      });
    }
  }
};

AutosuggestComponent.propTypes = {
  /**
   * @attribute autosuggestStore
   * @required
   * @type {AutosuggestStore}
   */
  autosuggestStore: React.PropTypes.any.isRequired,

  /**
   * @attribute focusPlaceholder
   * @optional
   * @type Boolean
   */
  focusPlaceholder: React.PropTypes.bool,

  /**
   * @attribute focusPlaceholderText
   * @optional
   * @type String
   */
  focusPlaceholderText: React.PropTypes.string,


  /**
   * @attribute  suggestionsOnlyOnInputChange
   * @type Boolean
   */
  suggestionsOnlyOnInputChange: React.PropTypes.bool
};

AutosuggestComponent.defaultProps = {
  autosuggestStore: null,
  focusPlaceholder: true,
  focusPlaceholderText: "",
  suggestionsOnlyOnInputChange: true
};

export default AutosuggestComponent;
