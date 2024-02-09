const { Sequelize } = require("sequelize");
const dbConfig = require("../config/dbConfig");
const mysql = require("mysql2/promise");


// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
// });

// connection.query(
//     `CREATE DATABASE IF NOT EXISTS BlogDB`,
//     function (err, results) {
//         console.log(results);
//         console.log(err);
//     }
// );

// connection.end();



const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});


module.exports = sequelize;