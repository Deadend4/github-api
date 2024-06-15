import postgres from 'pg';
import pgConfig from '../configs/db.config.js';

const { Pool } = postgres;

const db = new Pool(pgConfig);

export default db;
