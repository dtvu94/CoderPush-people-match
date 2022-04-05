import { Pool } from 'pg';

const pool = new Pool({
  user: 'sa',
  host: '0.0.0.0',
  database: 'peoplematch',
  password: 'admin',
  port: 5432,
})

export default pool;
