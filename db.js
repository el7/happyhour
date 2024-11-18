const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'dbHappyHourData',
  password: 'Glaceau20!ubuntu',
  port: 5432,
});

client.connect();

module.exports = client;
