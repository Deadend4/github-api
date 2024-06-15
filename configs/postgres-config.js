import pkg from 'pg';
import { dbHost, dbName, dbPassword, dbPort, dbUser } from './dotenv.js';

const { Pool } = pkg;
const pgConfig = {
  database: dbName,
  host: dbHost,
  user: dbUser,
  port: dbPort,
  password: dbPassword,
};
export const pool = new Pool(pgConfig);
