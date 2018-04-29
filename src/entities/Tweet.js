module.exports = class Tweet {
  constructor({ id, timestamp }) {
    this._id = id;
    this._timestamp = timestamp;
  }

  get id() {
    return this._id;
  }

  get timestamp() {
    return this._timestamp;
  }
};
