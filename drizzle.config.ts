import "dotenv/config";
import type { Config } from "drizzle-kit";

import dotenv from "dotenv";
dotenv.config({ path: "public/.env.local" });  // Explicitly load .env.local


export default {
    schema: "./db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;

