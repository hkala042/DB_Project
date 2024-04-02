const Pool = require('pg').Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "hil_server@",
    database: "WebApp"
});

module.exports = pool
