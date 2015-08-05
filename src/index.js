/**
 * This is a autosuggest with a plugable data source. To use {{#crossLink "AutosuggestUI"}} the ui {{/crossLink}}
 * simply pass an implementation of {{#crossLink "AutosuggestStore"}}AutosuggestStore{{/crossLink}} as the property 'autosuggestStore'
 * @module st-react-autosuggest
 * @main st-react-autosuggest
 */
export {default as AutosuggestUI} from "./lib/ui/autosuggest";
export {default as AutosuggestStore} from "./lib/store/autosuggestStore";
export {default as AutosuggestStaticStore} from "./lib/store/autosuggestStaticStore";
