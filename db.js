const Pool = require('pg').Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "s/83Fvq/pG",
    database: "CSI2532"
});

module.exports = pool
