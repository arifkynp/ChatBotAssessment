import mysql from "mysql2/promise";
import { env } from "process";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: env.DB_PASSWORD || "password",
  database: "chatbot_platform",
  waitForConnections: true,
  connectionLimit: 10,
});