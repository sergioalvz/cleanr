const TwitterCsvFileParser = require("../services/TwitterCsvFileParser");

module.exports = class Count {
  constructor({ file }) {
    this._parser = new TwitterCsvFileParser({ file });
  }

  async perform() {
    const tweets = await this._parser.perform();

    return tweets.length;
  }
};
