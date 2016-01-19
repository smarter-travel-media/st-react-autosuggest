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
    this.state = {
      originalOnSuggestionSelected: (this.props.onSuggestionSelected) ? this.props.onSuggestionSelected : null,
      wrappedProps: this.wrapProps(this.props),
      lastValue: this.valueFromProps(this.props),
      justSelected: false,
      value: this.valueFromProps(this.props)
    };
  }

  /**
   * Called when new properties are passed to this component
   * @param props new properties
     */
  componentWillReceiveProps(nextProps) {
    this.setState({
      wrappedProps: this.wrapProps(nextProps),
      lastValue: this.valueFromProps(nextProps),
      justSelected: false,
      value: this.valueFromProps(nextProps)
    });
  }

  /**
   * This is automatically called by react and renders the autosuggest into the dom.
   * @method render
   */
  render() {
    return (
      <Autosuggest ref="suggest" {...this.state.wrappedProps} value={this.state.value} suggestions={this.props.autosuggestStore.getSuggestion.bind(this.props.autosuggestStore)} />
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
    wrappedProps.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    if (!wrappedProps.inputAttributes) {
      wrappedProps.inputAttributes = {};
    }

    if (this.props.focusPlaceholder) {
      wrappedProps.inputAttributes.onFocus = this.onFocus.bind(this);
      wrappedProps.inputAttributes.onBlur = this.onBlur.bind(this);
    }
    delete wrappedProps.value;
    return wrappedProps;
  }

  componentDidMount() {
    this.refs.suggest.refs.input.focus();
    this.refs.suggest.refs.input.blur();
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
      if (inputText === this.state.lastValue) {
        return false;
      }
    }

    return this.props.showWhen(inputText);
  }

  onSuggestionSelected(selection, event) {
    if (this.state.originalOnSuggestionSelected) {
      this.state.originalOnSuggestionSelected(selection, event);
    }
    this.setState({
      lastValue: this.props.suggestionValue(selection),
      justSelected: true
    });
  }

  onFocus(evt) {
    var value = evt.target.value;

    if (this.state.justSelected) {
      this.setState({
        justSelected: false
      });
      return;
    }

    this.setState({
      value: this.props.focusPlaceholderText,
      lastValueBeforeFocus: value
    });
  }

  onBlur(evt) {
    if (evt.target.value === this.props.focusPlaceholderText) {
      this.setState({
        value: this.state.lastValueBeforeFocus
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
