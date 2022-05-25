import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { host, database, database_test, user, pass, env } = process.env;
let client: Pool;
if (env == 'dev') {
  client = new Pool({
    host: host,
    database: database,
    user: user,
    password: pass,
  });
} else {
  client = new Pool({
    host: host,
    database: database_test,
    user: user,
    password: pass,
  });
}

export default client;
