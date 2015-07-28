# st-autosuggest

## Description
This is a heavily abstracted autosuggest built on 'react-autosuggest'. All properties passed to this component will be passed down to the underlying autosuggest except for 'suggestions' as it is going to be provided by out backing AutosuggestStore.

###Usage
This autosuggest requires an implementation of 'src/lib/store/autosuggestStore' passed as a property.

```js
import {AutosuggestUI, AutosuggestStaticStore} from "st-react-autosuggest";
<AutosuggestUI autosuggestStore={new AutosuggestStaticStore()} />
```

###Options

####autosuggestStore {AutoSuggestStore} required
A js class that extends AutosuggestStore.

For a full list of properties that this component supports see the underlying autosuggest [options](https://github.com/moroshko/react-autosuggest#options)

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
