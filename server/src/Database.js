const { Pool } = require('pg');

const TABLE_NAME = 'links';

module.exports = class Database {

  constructor ({ DATABASE_USER = 'postgres', DATABASE_PASSWORD = 'postgres', DATABASE_URL }) {


    const config = {
      connectionString: DATABASE_URL,
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000,
    };

    console.log(config);

    this.pool = new Pool(config);

    this.pool.on('connect', () => {
      console.log('Connected to the Database');
    });

    this.pool.on('remove', () => {
      console.log('client removed');
    });

    this.createTables();
  }

  upsert ({ table, user, data, callback }) {
    const upsert = `INSERT INTO ${table}(user_name, data) VALUES ($1, $2) ON CONFLICT (user_name) DO 
    UPDATE SET data=$2 RETURNING data`;
    const values = [user, JSON.stringify(data)];

    console.log(JSON.stringify(data));

    this.executeQuery(upsert, values).then((res) => {
      callback(res.rows[0].data);
    }).catch((err) => {
      console.log(err);
      callback(err);
    });
  }

  read ({ table, user, callback }) {

    const read = `SELECT data FROM ${table} where user_name=$1`;
    const values = [user];

    this.executeQuery(read, values).then((res) => {
      if (res.rows.length > 0) {
        callback(res.rows[0].data);
      } else {
        callback('[]');
      }
    }).catch((err) => {
      console.log(err);
      callback(undefined);
    });
  }

  executeQuery (qry, values = []) {
    return this.pool.query(qry, values);
  }

  createTables () {

    const createExtension = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
    this.executeQuery(createExtension);

    const recreate = false;
    if (recreate) {
      const dropTable = `DROP
          TABLE
          IF EXISTS ${TABLE_NAME}`;
      this.executeQuery(dropTable);
    }

    const createTable = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
                         (
                             ID        uuid DEFAULT uuid_generate_v4 (),
                             user_name VARCHAR(100) UNIQUE NOT NULL,
                             data      json                NOT NULL
                         );`;
    this.executeQuery(createTable);
  }

};