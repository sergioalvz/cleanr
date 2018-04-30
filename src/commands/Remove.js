const Twitter = require("../services/Twitter");

module.exports = class Remove {
  constructor(_, { twitter = new Twitter() } = {}) {
    this._twitter = twitter;
  }

  async perform({ listOfIds = [] }) {
    for (const id of listOfIds) {
      await this._twitter.removeTweet(id);
    }
  }
};
