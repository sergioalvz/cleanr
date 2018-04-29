const moment = require("moment");

const Until = require("../../../src/specifications/Until");

describe("Until", () => {
  describe("matches", () => {
    it("returns true if the tweet was posted before the injected date", () => {
      const tweet = { timestamp: moment("2017-12-31") };
      const subject = new Until({ date: moment("2018-01-01") });

      const matches = subject.matches(tweet);

      expect(matches).toBeTruthy();
    });

    it("returns false if the tweet was posted after the injected date", () => {
      const tweet = { timestamp: moment("2018-01-31") };
      const subject = new Until({ date: moment("2018-01-01") });

      const matches = subject.matches(tweet);

      expect(matches).toBeFalsy();
    });
  });
});
