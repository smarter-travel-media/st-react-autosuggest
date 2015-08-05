/**
 * @module st-react-autosuggest
 */
/**
 * The base class that any autosuggest store needs to override. This is currently a no-op implementation.
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
}

export default AutosuggestStore;
