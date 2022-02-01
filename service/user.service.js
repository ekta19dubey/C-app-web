const database = require('../Db/db')

const { json } = require('express');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
console.log("user.service.js is called");

const userModel = {};

userModel.user_register = async (email, pass) => {
    let db_connection = await database;
    //console.log('databse' + db_connection)
    console.log("user_register service", email, pass)

    var querry = `INSERT INTO  user (email, password) VALUES ("${email}", "${pass}")`;

    return new Promise((resolve, reject) => {
        db_connection.query(querry, (err, result) => {

            if (err) {
                console.log("errrrrrrrr", err)
                return reject(err);
            }
            if (result) {
                console.log("if resulttttttt", result)
                return resolve(result)

            } else {
                console.log("else resulttttttt", result)
                return reject(result)
            }

        })
    })
}


userModel.userChecking = async (email) => {
    const db_connection = await database;
    return new Promise((resolve, reject) => {
        db_connection.query(`SELECT * FROM user where email='${email}'`, function (err, resulted, fields) {
            //connection.release();
            if (err) return reject(err);
            resolve(resulted);
        });
    });

}


userModel.device_list = async (email) => {
    const db_connection = await database;
    return new Promise((resolve, reject) => {
        db_connection.query(`SELECT DISTINCT * FROM devices`, function (err, resulted, fields) {
            //connection.release();
            if (err) return reject(err);
            resolve(resulted);
        });
    });

}


userModel.contact_list = async (data) => {
    let contactListSql = "SELECT * FROM contact_details WHERE device_id = ?"
    const connection = await database;
    return new Promise((resolve, reject) => {

        connection.query(contactListSql, [data], (err, result) => {

            if (err) {
                console.log(err)
                // connection.release();
                // return reject(err);
            }

            if (result) {
                console.log("if resulttttttt", result)
                return resolve(result)

            } else {
                console.log("else resulttttttt", result)
                return reject(result)
            }



        });


    })
}

userModel.call_details = async (data) => {
    let callListSql = "SELECT * FROM call_details WHERE device_id = ?"
    const connection = await database;
    return new Promise((resolve, reject) => {

        connection.query(callListSql, [data], (err, result) => {

            if (err) {
                console.log(err)
                // connection.release();
                // return reject(err);
            }

            if (result) {
                console.log("if resulttttttt", result)
                return resolve(result)

            } else {
                console.log("else resulttttttt", result)
                return reject(result)
            }



        });


    })
}
module.exports = userModel;