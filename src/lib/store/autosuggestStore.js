/**
 * @module st-react-autosuggest
 */
/**
 * The base class that any autosuggest store needs to override. This is an 'interface'.
 * The autosuggest store should take a locale in the constructor to localize suggestions.
 * @class AutosuggestStore
 */
class AutosuggestStore {
  constructor() {}
  /**
   * This function takes a suggestion and passes an arry of possible matches to
   * the provided callback
   * @method getSuggestion
   * @param {String} suggestion the suggestion to look up
   * @param {Function} callback function that is called when results are recieved.
   *  @param {Error} callback.error an error if it occured
   *  @param {Array} callback.suggestions an array of suggestions
   *    @param {Suggestion} callback.suggestions.suggestion  A suggestions is String, e.g.: 'Mentone' or Object, e.g.: { suburb: 'Mentone', postcode: '3194' }
   */
  getSuggestion(suggestion, callback) {
    callback(new Error("Method not implemented"), null);
  }

  /**
   * @method getSuggestionValue
   * @param {Suggestion} suggestion
   * @return {React.Component} see https://github.com/ezequiel/react-typeahead-component#reactelement-optiontemplate-required
   */
  getSuggestionTemplate() {
    throw "Method not implemented";
  }

  /**
   * @method getDisplayValue
   * @param {Suggestion} suggestion
   * @return {String} the display value for the suggestion
   */
  getDisplayValue(Suggestion) {
    throw "Method not implemented";
  }
}

export default AutosuggestStore;
