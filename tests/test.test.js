var expect = require("chai").expect;

describe("Playing arround with Tests", function () {
    it("Used to try and return fails and successes", function () {
        expect(1 + 1).to.equal(2);
        expect(2 + 2).to.equal(4);
    });
});