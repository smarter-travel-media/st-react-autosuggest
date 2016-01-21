import {expect} from "chai";
import AutosuggestStaticStore from "../src/lib/store/autosuggestStaticStore";
import StaticOptionTemplate from "../src/lib/ui/static-option-template";

describe("AutosuggestStaticStore", function () {
  it("callback should be called with array containing boston", function () {
    var cb = function (arg1, arg2) {
      expect(arg1).to.equal(null);
      expect(arg2).to.equal(["Boston"]);
      done();
    };

    var autosuggestStore = new AutosuggestStaticStore();
    autosuggestStore.getSuggestion("bos", cb);
  });

  it("callback should be called with an empty array", function () {
    var cb = function (arg1, arg2) {
      expect(arg1).to.equal(null);
      expect(arg2).to.equal([]);
      done();
    };

    var autosuggestStore = new AutosuggestStaticStore(["Miami"]);
    autosuggestStore.getSuggestion("bos", cb);
  });

  it("getSuggestionTemplate should return the static option template", function () {
    var autosuggestStore = new AutosuggestStaticStore(["Miami"]);
    expect(autosuggestStore.getSuggestionTemplate()).to.equal(StaticOptionTemplate);
  });

  it("getDisplayValue should return the suggestion", function () {
    var autosuggestStore = new AutosuggestStaticStore(["Miami"]);
    expect(autosuggestStore.getDisplayValue("Miami")).to.equal("Miami");
  });
});
