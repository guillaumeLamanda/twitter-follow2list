import { ApolloError } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import getRedisClient from "lib/redis";
import { TwitterClient } from "twitter-api-client";

export type Context = {
  twitterClient: TwitterClient;
};

type AuthorizationContext = {
  accessToken: string;
  accessTokenSecret: string;
};
const getAuthFrom = async (
  req: MicroRequest
): Promise<AuthorizationContext | null> =>
  new Promise((resolve, reject) => {
    try {
      const oauthToken = req.headers.authorization;
      const redisClient = getRedisClient();
      redisClient.hmget(
        oauthToken,
        "token",
        "secret",
        (err, [accessToken, accessTokenSecret] = []) => {
          if (err) reject(new ApolloError("cannot authenticate"));
          redisClient.quit();
          resolve({
            accessToken,
            accessTokenSecret,
          });
        }
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  });

export const getContextFromRequest = async (
  req: MicroRequest
): Promise<Context> => {
  const auth = await getAuthFrom(req);

  return {
    twitterClient: new TwitterClient({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_KEY_SECRET,
      accessToken: auth.accessToken,
      accessTokenSecret: auth.accessTokenSecret,
    }),
  };
};
