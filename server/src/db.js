const pg = require('pg');

const config = {
  user: 'postgres', //TODO: externalize
  database: 'linkhub',
  password: 'changeme',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('Connected to the Database');
});

const setupDatabase = () => {
  createTables();
};

const createTables = () => {
  const linkhub = `CREATE TABLE IF NOT EXISTS
      linkhub(
        id SERIAL PRIMARY KEY,
      )`;
  pool.query(linkhub)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


//export pool and createTables to be accessible  from an where within the application
module.exports = {
  setupDatabase,
  pool,
};

require('make-runnable');