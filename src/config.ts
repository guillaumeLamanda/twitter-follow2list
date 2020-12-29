export const apiKey = process.env.API_KEY;
export const apiKeySecret = process.env.API_KEY_SECRET;
export const bearerToken = process.env.BEARER_TOKEN;
export const callbackUrl =
  process.env.NODE_ENV === "production"
    ? "https://twitter.follow2list.lamanda.fr/api/oauth/callback"
    : "http://localhost:3000/api/oauth/callback";
