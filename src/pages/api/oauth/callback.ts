import oauth from "lib/oauth";
import getRedisClient from "lib/redis";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

const oAuthCallbackHandler = (
  { query: { oauth_token, oauth_verifier } }: NextApiRequest,
  res: NextApiResponse
) => {
  return new Promise((resolve) => {
    const errCb = (err) => {
      if (!res.headersSent) res.status(500).end();
      redisClient.quit();
      resolve(err);
    };

    const redisClient = getRedisClient();

    redisClient.on("error", errCb);

    redisClient.get(oauth_token as string, (err, oauthTokenSecret) => {
      if (err) {
        errCb(err);
      }
      oauth.getOAuthAccessToken(
        oauth_token as string,
        oauthTokenSecret,
        oauth_verifier as string,
        (err, token, tokenSecret) => {
          if (err) {
            errCb(err);
          }

          redisClient.del(oauth_token, () => {
            redisClient.hmset(
              oauth_token as string,
              "token",
              token,
              "secret",
              tokenSecret,
              () => {
                const twelveHoursInSeconds = 60 * 60 * 12;
                redisClient.expire(oauth_token as string, twelveHoursInSeconds);
                redisClient.quit();
                res.redirect(`/app`);
                resolve(oauth_token);
              }
            );
          });
        }
      );
    });
  });
};

export default oAuthCallbackHandler;
