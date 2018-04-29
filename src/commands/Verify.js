const Twitter = require("../services/Twitter");

module.exports = class Verify {
  constructor({ accessToken, accessTokenSecret }) {
    this._twitter = new Twitter({ accessToken, accessTokenSecret });
  }

  async perform() {
    return await this._twitter.verify();
  }
};
