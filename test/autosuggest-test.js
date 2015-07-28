import React from "react/addons";
import chai, {expect} from "chai";
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

});
