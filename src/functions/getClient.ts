import { TwitterClient } from "twitter-api-client";

let client: TwitterClient;

if (!client) {
  client = new TwitterClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_KEY_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  });
}

const getClient = () => client;

export default getClient;
