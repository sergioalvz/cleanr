const Twitter = require("../services/Twitter");

module.exports = class Remove {
  constructor(_, { twitter = new Twitter() } = {}) {
    this._twitter = twitter;
  }

  async perform({ listOfIds = [] }) {
    for (let index = 0; index < listOfIds.length; index++) {
      const id = listOfIds[index];

      console.log(`Removing ${index + 1} of ${listOfIds.length}: ${id}`);

      await this._twitter.removeTweet(id);
    }
  }
};
