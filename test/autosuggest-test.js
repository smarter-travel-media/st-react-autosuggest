import React from "react/addons";
import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import {AutosuggestUI, AutosuggestStaticStore} from "../src/index";
import Autosuggest from "react-autosuggest";
var TestUtils = React.addons.TestUtils;
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
    expect(output.type).to.equal(Autosuggest);
  });


  it("Should skip showWhen when value is not changed", function () {
    const shallowRenderer = TestUtils.createRenderer();

    var showWhen = sinon.spy();

    shallowRenderer.render(React.createElement(AutosuggestUI, {"showWhen": showWhen, "suggestionsOnlyOnInputChange": true, "value": "test values", "autosuggestStore": new AutosuggestStaticStore()}));
    var output = shallowRenderer.getRenderOutput();
    TestUtils.Simulate.focus(output);
    expect(showWhen).to.have.callCount(0);
  });

  it("Should not skip showWhen even when value is not changed with suggestionsOnlyOnInputChange set to false", function () {
    const shallowRenderer = TestUtils.createRenderer();

    var showWhen = sinon.spy();

    shallowRenderer.render(React.createElement(AutosuggestUI, {"showWhen": showWhen, "suggestionsOnlyOnInputChange": false, "value": "test values", "autosuggestStore": new AutosuggestStaticStore()}));
    var output = shallowRenderer.getRenderOutput();
    TestUtils.Simulate.focus(output);

    expect(showWhen).to.have.callCount(1);
  });

  it("Should skip showWhen when focused", function () {
    const shallowRenderer = TestUtils.createRenderer();

    var showWhen = sinon.spy();

    shallowRenderer.render(React.createElement(AutosuggestUI, {"showWhen": showWhen, "suggestionsOnlyOnInputChange": true, "autosuggestStore": new AutosuggestStaticStore()}));
    var output = shallowRenderer.getRenderOutput();
    TestUtils.Simulate.focus(output);

    expect(showWhen).to.have.callCount(0);
  });
});
