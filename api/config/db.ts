import mysql from "mysql2/promise";
import { env } from "process";

export const db = mysql.createPool({
  host: "localhost",
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: "chatbot_platform",
  waitForConnections: true,
  connectionLimit: 10,
});