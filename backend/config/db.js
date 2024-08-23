const mysql = require('mysql2/promise');

let pool;
try {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,

    });
}
catch (err) {
    console.log(err)
    process.exit()

}

const createUsertTable = `CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTO_INCREMENT,
       name TEXT NOT NULL,
       email TEXT NOT NULL,
       password TEXT NOT NULL,
       created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       role  TEXT NOT NULL
)`

pool.query(createUsertTable)


module.exports = pool