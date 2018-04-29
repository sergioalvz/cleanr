const moment = require("moment");

const TwitterCsvFileParser = require("../services/TwitterCsvFileParser");
const Until = require("../specifications/Until");

module.exports = class Select {
  constructor({ file }) {
    this._parser = new TwitterCsvFileParser({ file });
  }

  async perform({ until }) {
    const query = new Until({ date: moment(until) });

    return await this._parser.perform({ query });
  }
};
