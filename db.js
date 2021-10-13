const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "user_db",
    password: "Kdabiru@2023",
    port: 5432,
});

module.exports = pool;