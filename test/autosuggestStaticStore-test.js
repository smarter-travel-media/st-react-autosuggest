import {expect} from "chai";
import {AutosuggestStaticStore} from "../src/index";
describe("AutosuggestStaticStore", function () {
    it("callback should be called with array containing boston", function () {
        var cb = function (arg1, arg2) {
          expect(arg1).to.equal(null);
          expect(arg2).to.equal(["Boston"]);
          done();
        };

        var autosuggestStore = new AutosuggestStaticStore(["Boston"]);
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
});
