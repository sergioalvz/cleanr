const TwitterClient = require("twitter-lite");

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET
} = process.env;

module.exports = class Twitter {
  constructor(
    {
      consumerKey = TWITTER_CONSUMER_KEY,
      consumerSecret = TWITTER_CONSUMER_SECRET,
      accessToken = TWITTER_ACCESS_TOKEN,
      accessTokenSecret = TWITTER_ACCESS_TOKEN_SECRET
    } = {},
    { client } = {}
  ) {
    this._client =
      client ||
      new TwitterClient({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token_key: accessToken,
        access_token_secret: accessTokenSecret
      });
  }

  async removeTweet(id) {
    const response = await this._client.post(`statuses/destroy/${id}`);

    if (response.errors) {
      throw response.errors;
    }
  }

  async verify() {
    const response = await this._client.get("account/verify_credentials");

    if (response.errors) {
      throw response.errors;
    }
  }
};
