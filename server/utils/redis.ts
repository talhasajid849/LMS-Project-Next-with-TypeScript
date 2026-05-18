import { Redis } from "ioredis";
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const redisClient = () => {
    if (process.env.REDIS_URL) {
        const redisUrl = new URL(process.env.REDIS_URL);

        if (redisUrl.hostname.endsWith(".upstash.io") && redisUrl.protocol === "redis:") {
            redisUrl.protocol = "rediss:";
        }

        return redisUrl.toString();
    }
    throw new Error(`Redis connection failed`);
}

export const redis = new Redis(redisClient(), {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
        return Math.min(times * 200, 5000);
    },
    reconnectOnError(error) {
        return error.message.includes("READONLY");
    },
});

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("ready", () => {
    console.log("Redis ready");
});

redis.on("error", (error) => {
    console.error("Redis error:", error.message);
});

redis.on("close", () => {
    console.warn("Redis connection closed. Reconnecting if possible...");
});
