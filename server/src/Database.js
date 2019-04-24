const pg = require('pg');

module.exports = class Database {

  constructor ({ DATABASE_USER = 'postgres', DATABASE_PASSWORD = 'postgres' }) {

    const config = {
      user: DATABASE_USER,
      database: 'linkhub',
      password: DATABASE_PASSWORD,
      port: 5432,
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000,
    };

    this.pool = new pg.Pool(config);

    this.pool.on('connect', () => {
      console.log('Connected to the Database');
    });

    this.pool.on('remove', () => {
      console.log('client removed');
      process.exit(0);
    });

    this.createTables();
  }

  upsert ({ table, user, data }) {
    console.log(`${table} -> ${user} -> ${data}`);

  }

  read ({ table, user }) {
    console.log(`${table} -> ${user}}`);
  }

  createTables () {
    const linkhub = `CREATE TABLE IF NOT EXISTS
                         links
                     (
                         id      SERIAL PRIMARY KEY,
                         user_id VARCHAR(50) UNIQUE NOT NULL
                     )`;
    this.pool.query(linkhub).then((res) => {
      console.log(res);
      this.pool.end();
    }).catch((err) => {
      console.log(err);
      this.pool.end();
    });
  }

};