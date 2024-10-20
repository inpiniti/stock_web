import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const ip = "116.121.7.117";
const port = "5432";
const user = "postgres";
const password = "!Wjd53850";
const database = "postgres";
const url = `postgres://${user}:${password}@${ip}:${port}/${database}`; //?sslmode=require`;

let db: any;

export const useDrizzle = () => {
  if (!db) {
    const queryClient = postgres(url);
    db = drizzle(queryClient);
  }

  return db;
};
