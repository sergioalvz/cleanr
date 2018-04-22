declare module "twitter-lite" {
  export interface TwitterOptions {
    consumer_key?: string;
    consumer_secret?: string;
    access_token_key?: string;
    access_token_secret?: string;
  }

  class Twitter {
    constructor(options: TwitterOptions);

    public get(path: string): Promise<any>;
  }

  export default Twitter;
}
