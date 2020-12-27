import { OAuth } from "oauth";

const oauth = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  process.env.API_KEY,
  process.env.API_KEY_SECRET,
  "1.0A",
  null,
  "HMAC-SHA1"
);

export default oauth;
