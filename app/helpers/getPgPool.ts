import { Pool } from 'pg';

const pool = new Pool({
  user: 'sa',
  host: 'localhost',
  database: 'peoplematch',
  password: 'admin',
  port: 5432,
})

export default pool;
