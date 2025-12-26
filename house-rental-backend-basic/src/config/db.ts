import { createPool } from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();  // Load environment variables

export const db = createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
