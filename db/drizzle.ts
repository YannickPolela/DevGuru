import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";

import * as schema from "./schema";

import dotenv from "dotenv";
dotenv.config({ path: "public/.env.local" });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});

export default db;
