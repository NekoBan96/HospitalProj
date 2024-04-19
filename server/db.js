const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "alisher11",
    host: "localhost",
    port: 5432,
    database: "hospitalProject"
})

module.exports = pool