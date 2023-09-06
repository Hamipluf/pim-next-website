import { Pool } from "pg";

const url_conection = process.env.URL_POSTGRESQL;

const pool = new Pool({
  connectionString: url_conection,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
