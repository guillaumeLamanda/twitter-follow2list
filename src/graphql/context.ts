import getClient from "functions/getClient";
import { TwitterClient } from "twitter-api-client";

export type Context = {
  twitterClient: TwitterClient;
};

export const context: Context = {
  twitterClient: getClient(),
};
