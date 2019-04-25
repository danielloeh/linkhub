const pg = require('pg');

const TABLE_NAME = 'links';

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
    });

    this.createTables();
  }

  upsert ({ table, user, data }) {
    const upsert = `INSERT INTO ${table}(user_name, data) VALUES ($1, $2) ON CONFLICT (data) DO 
    UPDATE SET data=$2 `;
    const values= ['my-user', JSON.stringify(data)];

    this.executeQuery(upsert, values);
  }

  read ({ table, user }) {
    console.log(`${table} -> ${user}}`);

    const read = `SELECT data FROM ${table} where user_name=$1`;
    const values = [user];

    this.executeQuery(read, values);
  }

  async executeQuery (qry, values = []) {
    await this.pool.query(qry, values).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  async createTables () {

    const createExtension = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
    this.executeQuery(createExtension);

    // const dropTable = `DROP
    //     TABLE
    //     IF EXISTS ${TABLE_NAME}`;
    //
    // this.executeQuery(dropTable);

    const createTable = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
                         (
                             ID        uuid DEFAULT uuid_generate_v4 (),
                             user_name VARCHAR(100) UNIQUE NOT NULL,
                             data      json                NOT NULL
                         );`;
    this.executeQuery(createTable);
  }

};