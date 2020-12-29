import oauth from "lib/oauth";
import getRedisClient from "lib/redis";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve) => {
    oauth.getOAuthRequestToken(async (err, oauthToken, oauthTokenSecret) => {
      if (err) {
        res.status(500);
        resolve(err);
      }
      const redisClient = getRedisClient();
      redisClient.on("error", (error) => {
        console.error(error);
        if (!res.headersSent) {
          res.status(500).end();
          resolve(error);
        }
      });
      redisClient.set(oauthToken, oauthTokenSecret, () => {
        const twoMinutesInSecond = 60 * 2;
        redisClient.expire(oauthToken, twoMinutesInSecond);
        redisClient.quit();

        res.status(200).json({
          oauthToken,
        });
        resolve(oauthToken);
      });
    });
  });
};
