import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set in environment variables. Please check your .env.local file."
  );
}

let db: ReturnType<typeof drizzle>;

try {
  // Create connection with retry logic
  const createConnection = () => {
    try {
      const sql = neon(process.env.DATABASE_URL!);
      return drizzle(sql, { schema });
    } catch (error) {
      console.error("Failed to create database connection:", error);
      throw error;
    }
  };

  db = createConnection();
} catch (error) {
  console.error("Database connection error:", error);
  throw new Error("Failed to initialize database connection");
}

export default db;
