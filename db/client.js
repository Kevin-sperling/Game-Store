// Connect to DB
const { Client } = require('pg');

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'graceshopper';

//"host=localhost port=5432 dbname=graceshopper user=postgres 
const DB_URL = ""
  //  `postgressql://postgres:password@localhost:5432/${DB_NAME}`;

let client = undefined;

// github actions client config
if (process.env.CI) {
  client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'postgres',
  });
} else {
  // local / heroku client config
  client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: DB_NAME,
    ssl: false,
    
  })
}

module.exports = client;
