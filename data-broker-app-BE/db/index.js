const pgp = require('pg-promise')();
const connectionString = "postgresql://postgres:password@localhost:5432/data_broker_database"

const db = pgp(connectionString)

module.exports = db;