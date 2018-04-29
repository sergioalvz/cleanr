const Twitter = require("twitter-lite");

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET
} = process.env;

function buildTwitter({
  consumerKey = TWITTER_CONSUMER_KEY,
  consumerSecret = TWITTER_CONSUMER_SECRET,
  accessToken = TWITTER_ACCESS_TOKEN,
  accessTokenSecret = TWITTER_ACCESS_TOKEN_SECRET
}) {
  return new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  });
}

module.exports = class Verify {
  constructor({ accessToken, accessTokenSecret }) {
    this._twitter = buildTwitter({ accessToken, accessTokenSecret });
  }

  async perform() {
    const response = await this._twitter.get("account/verify_credentials");

    if (response.errors) {
      throw response.errors;
    }
  }
};
