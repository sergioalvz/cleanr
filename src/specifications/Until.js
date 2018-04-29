module.exports = class Until {
  constructor({ date }) {
    this._date = date;
  }

  matches(tweet) {
    return tweet.timestamp.isBefore(this._date);
  }
};
