require('dotenv').config()
const Db = require('mssql-async').default
module.exports.db = new Db( {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASS,
  database: process.env.MSSQL_DATABASE,
  server: process.env.MSSQL_HOST,
  options: { trustServerCertificate: true },
  pool: {
    max: 50,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  connectionTimeout:60000,
  requestTimeout:60000
});



