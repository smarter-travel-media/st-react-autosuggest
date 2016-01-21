/**
 * @module st-react-autosuggest
 */
import AutosuggestStore from "./autosuggestStore";
import OptionTemplate from "../ui/static-option-template";

/**
 * This is a sample implementation of an AutosuggestStore. This should never be used in
 * production. This is currently only used for unit tests.
 * @class AutosuggestStaticStore
 * @extends AutosuggestStore
 * @constructor
 * @param {Array} locations the list of suggestable locations.
 *  @param {String} locations.location A string name "Boston"
 * @example
 *   var store = new AutosuggestStaticStore(["Boston", "Miami"]);
 *
 */
class AutosuggestStaticStore extends AutosuggestStore {

  constructor(locations = ["Boston", "New York", "Miami"]) {
    super();
    this.locations = locations;
  }

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
    const regex = new RegExp("^" + suggestion, "i");
    const suggestions = this.locations.filter(suburb => regex.test(suburb));
    setTimeout(() => callback(null, suggestions), 300); // Emulate API call
  }

  getSuggestionTemplate() {
    return OptionTemplate;
  }

  getDisplayValue(suggestion) {
    return suggestion;
  }
}

export default AutosuggestStaticStore;
