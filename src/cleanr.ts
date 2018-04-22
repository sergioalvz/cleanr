import program from "commander";
import { config } from "dotenv";
import Twitter, { TwitterOptions } from "twitter-lite";

config();

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET
} = process.env;

function buildTwitter(options: TwitterOptions) {
  const credentials = {
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token_key: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
  };

  return new Twitter(Object.assign({}, credentials, options));
}

interface VerifyOptions {
  accessToken?: string;
  accessTokenSecret?: string;
}

async function verify({ accessToken, accessTokenSecret }: VerifyOptions) {
  const twitter = buildTwitter({
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  });

  try {
    await twitter.get("account/verify_credentials");
    console.log("OK");
  } catch (error) {
    process.exit(1);
  }
}

program
  .name("cleanr")
  .version("1.0.0")
  .command("verify")
  .description("verifies that everything's okay")
  .option("--access-token", "user's access token")
  .option("--access-token-secret", "user's access token secret")
  .action(verify);

program.parse(process.argv);
