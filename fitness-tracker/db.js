const pg = require('pg');

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost', // Usually 'localhost' if running locally
    database: 'fitnesstracking',
    password: 'tinybruno1326',
    port: 5432, // Default PostgreSQL port
  });
  

module.exports = pool;
