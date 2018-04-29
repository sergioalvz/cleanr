const { join } = require("path");

const TwitterCsvFileParser = require("../../../src/services/TwitterCsvFileParser");
const Until = require("../../../src/specifications/Until");

describe("TwitterCsvFileParser", () => {
  describe("#constructor", () => {
    it("throws an exception if it does not receive any file", () => {
      expect(() => new TwitterCsvFileParser()).toThrowError(
        /expected file argument to be present/
      );
    });
  });

  describe("#perform", () => {
    it("returns a collection with the right number of tweets", async () => {
      expect.assertions(1);

      const filePath = join(__dirname, "./fixtures/tweets.csv");

      const subject = new TwitterCsvFileParser({ file: filePath });

      const tweets = await subject.perform();

      expect(tweets.length).toEqual(9);
    });

    it("throws an exception if the file path does not exist", async () => {
      expect.assertions(1);

      const subject = new TwitterCsvFileParser({ file: "./foo/bar/baz.csv" });

      try {
        await subject.perform();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("applies the injected query specification", async () => {
      expect.assertions(1);

      const filePath = join(__dirname, "./fixtures/tweets.csv");

      const subject = new TwitterCsvFileParser({ file: filePath });

      const tweets = await subject.perform({
        query: new Until({ date: "2018-04-01" })
      });

      expect(tweets.length).toEqual(3);
    });
  });
});
