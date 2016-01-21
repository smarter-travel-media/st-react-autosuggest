import React from "react";
import TestUtils from "react-addons-test-utils";
import ReactDOM from "react-dom";
import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import {AutosuggestUI} from "../src/index";
import AutosuggestStaticStore from "../src/lib/store/autosuggestStaticStore";
import Autosuggest from "st-react-typeahead-component";
chai.use(sinonChai);

describe("Autosuggest UI", function () {
  it("Should fail to render", function () {
    const shallowRenderer = TestUtils.createRenderer();
    try {
      shallowRenderer.render(React.createElement(AutosuggestUI));
      return false;
    } catch (e) {
      return true;
    }
  });

  it("Should render correct underlying autosuggest lib", function () {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(AutosuggestUI, {"autosuggestStore": new AutosuggestStaticStore()}));
    var output = shallowRenderer.getRenderOutput();
    expect(output.props.children.type).to.equal(Autosuggest);
  });

  it("Should render with initialSuggestion", function () {
    var div = document.createElement('div');
    var typeaheadInstance = ReactDOM.render(
            <AutosuggestUI
                initialSuggestion='Miami'
                autosuggestStore={new AutosuggestStaticStore()}
            />,
            div
        );

    expect(typeaheadInstance.state.input).to.equal("Miami");
    expect(typeaheadInstance.state.options).to.deep.equal([]);
  });

  it("Focus should clear current value and blur should restore it", function () {
    var div = document.createElement('div');
    var typeaheadInstance = ReactDOM.render(
            <AutosuggestUI
                initialSuggestion='Miami'
                autosuggestStore={new AutosuggestStaticStore()}
            />,
            div
        );

    // The hint should be visible at this point.
    expect(typeaheadInstance.state.input).to.equal("Miami");
    expect(typeaheadInstance.state.options).to.deep.equal([]);

    var input = TestUtils.findRenderedDOMComponentWithClass(typeaheadInstance, "react-typeahead-usertext");
    TestUtils.Simulate.focus(input);

    expect(typeaheadInstance.state.input).to.equal("");
    expect(typeaheadInstance.state.options).to.deep.equal([]);

    TestUtils.Simulate.blur(input);

    expect(typeaheadInstance.state.input).to.equal("Miami");
    expect(typeaheadInstance.state.options).to.deep.equal([]);

  });


});
