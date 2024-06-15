import { dbHost, dbName, dbPassword, dbPort, dbUser } from './dotenv.config.js';

const pgConfig = {
  database: dbName,
  host: dbHost,
  user: dbUser,
  port: dbPort,
  password: dbPassword,
};

export default pgConfig;
