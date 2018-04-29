const csv = require("csv");
const moment = require("moment");

const { createReadStream } = require("fs");

const Identity = require("../specifications/Identity");
const Tweet = require("../entities/Tweet");

const CSV_TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss +0000";
const HEADER = [
  "tweet_id",
  "in_reply_to_status_id",
  "in_reply_to_user_id",
  "timestamp",
  "source",
  "text",
  "retweeted_status_id",
  "retweeted_status_user_id",
  "retweeted_status_timestamp",
  "expanded_urls"
];

function buildTweetFromRow(row) {
  const id = row[0];
  const timestamp = moment(row[3], CSV_TIMESTAMP_FORMAT);

  return new Tweet({ id, timestamp });
}

module.exports = class TwitterCsvFileParser {
  constructor({ file } = {}) {
    if (!file) throw new Error("expected file argument to be present");

    this._file = file;
  }

  perform({ query = new Identity() } = {}) {
    return new Promise((resolve, reject) => {
      const rows = [];

      const processRow = row => {
        const tweet = buildTweetFromRow(row);

        if (query.matches(tweet)) {
          rows.push(tweet);
        }
      };

      createReadStream(this._file)
        .on("error", error => reject(error))
        .pipe(csv.parse({ delimiter: "," }))
        .on("data", row => {
          if (JSON.stringify(row) !== JSON.stringify(HEADER)) {
            processRow(row);
          }
        })
        .on("end", () => resolve(rows));
    });
  }
};
