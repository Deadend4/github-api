import { Pool } from 'pg';

const databaseURL = process.env.DATABASE_URL;
const pool = new Pool(databaseURL);

module.exports = {
  pool,
};
