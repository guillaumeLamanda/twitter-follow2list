import { createClient } from "redis";

const getRedisClient = () =>
  createClient({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    auth_pass: process.env.REDIS_PASSWD,
    tls: true,
  });

export default getRedisClient;
