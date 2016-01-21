# st-react-autosuggest

## Description
This is a heavily abstracted autosuggest built on 'st-react-typeahead-component'. All properties passed to this component will be passed down to the underlying autosuggest except for 'suggestions' as it is going to be provided by out backing AutosuggestStore.

## Updating st-react-typeahead-component
This component depends on st-react-typeahead-component which is just (a forked repo)[https://github.com/smarter-travel-media/react-typeahead-component] that must be manually published to npm.

To get artifactory access see the `Publishing NPM Module`

- Checkout the repo
- Make changes and change versions
- Commit
- run `npm publish`

###Usage
This autosuggest requires an implementation of 'src/lib/store/autosuggestStore' passed as a property.



#### OptionTemplate
For what is available to the option template see the [readme](https://github.com/smarter-travel-media/react-typeahead-component/blob/master/README.md#reactelement-optiontemplate-required)
```js

import React from "react";
export default class OptionsTemplate extends React.Component {
  render() {
      var classes = "option-value",
      optionData = this.props.data;
      if (this.props.isSelected) {
        classes += " selected-option";
      }
      return (
          <div>
              <div className={classes}>
                  {optionData}
              </div>
          </div>
      );
  }
}
OptionsTemplate.propTypes = {
  data: React.PropTypes.string,
  isSelected: React.PropTypes.bool
};

```

#### AutosuggestStore

```js

import AutosuggestStore from "./autosuggestStore";
import OptionTemplate from "../ui/static-option-template";

class AutosuggestStaticStore extends AutosuggestStore {

  constructor(locations = ["Boston", "New York", "Miami"]) {
    super();
    this.locations = locations;
  }

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

```

## AutosuggestUI

```js

import {AutosuggestUI} from "st-react-autosuggest"
import AutosuggestStaticStore from ...
<AutosuggestUI autosuggestStore={new AutosuggestStaticStore()} />

```

###Options
```js

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
 *
 */
onSelected: React.PropTypes.func

```


## Developing
Pull down all the devDependencies
```
npm install
```
To see the list of available grunt tasks
```
grunt
```

The watch task:
```bash
grunt watch
```
As you make changes to the code your files will be automatically linted and the unit tests will be run.

### Generate docs
To generate yui docs at http://sites.smartertravel.net/projects/st-react-datepicker/
```bash
npm run docs
```

## Publishing NPM Module
While the Grunt task will take care of publishing the NPM module, you would still need to setup the credentials on your
machine to actually publish it. Begin, by adding the authentication token to your `.npmrc` file (this should be the one
in your home directory). You can do that by running the command similar to the following:

```bash
curl -u{user}:{password} "https://artifactory.smartertravel.net/artifactory/api/npm/auth" >> ~/.npmrc
```

Note that your password needs to be the encrypted version. To get that encrypted version of your password:
* Log into Artifactory thru the UI and you to your user's profile.
* Type in your password again and click on Unlock.
* The field below with your encrypted password will now be shown which you can copy and paste into the command above.

Once you have your authentication setup, you can now push to Artifactory.

---
