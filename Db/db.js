const mysql = require('mysql');
const dotenv = require('dotenv').config();
console.log("db.js called");
//SQL DATABASE CONNECTION
const connection = mysql.createConnection({
    host: dotenv.parsed.HOST,
    user: dotenv.parsed.USER,
    password: dotenv.parsed.PASSWORD,
    database: dotenv.parsed.DATABASE,
});


connection.connect((err) => {
    if (!err) {
        return console.log("DB Connected");
    } else {
        return console.log("DB not Connect");
    }
})
module.exports = connection;