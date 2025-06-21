import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "../config/env.js";

const isDev = process.env.NODE_ENV !== "production";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: isDev ? "DRY_RUN" : "LIVE" }),
    detectBot({
      mode: isDev ? "DRY_RUN" : "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: isDev ? "DRY_RUN" : "LIVE",
      refillRate: 1000, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 2000, // Bucket capacity of 10 tokens
    }),
  ],
});

export default aj;
