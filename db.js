const { Pool } = require('pg');

require('dotenv').config();
console.log('DB_USER:', process.env.DB_USER, 'db_pass: ', process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, done) => {
  if (err) {
      console.error('Error acquiring client', err.stack);
  } else {
      console.log('Connected to database');
      done();
  }
});

module.exports = pool;
