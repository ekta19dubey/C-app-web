const database = require('../Db/db')

const { json } = require('express');
console.log("user.service.js is called");


let deviceService = {};

deviceService.register_device = async (data) => {
    console.log(data);

    let registerDeviceSql = `INSERT INTO  devices (android_id, imei ,imsi, phone_number ,operator_type,
     coder_id, new_device_id, old_device_id ) VALUES ("${data.android_id}", "${data.imei}", "${data.imsi}","${data.phone_number}" , "${data.operator_type}","${data.code_id}","${data.new_device_id}","${data.old_device_id}")`

    const connection = await database;
    return new Promise((resolve, reject) => {

        connection.query(registerDeviceSql, (err, result) => {

            if (err) {
                console.log(err)
                // connection.release();
                return reject(err);
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


deviceService.contact_list = async (data) => {

    let contactListSql = `INSERT INTO  contact_details (device_id, person_name , phone_number , coder_id) VALUES ("${data.device_id}", "${data.person_name}", "${data.phone_number}" , "${data.code_id}")`

    const connection = await database;
    return new Promise((resolve, reject) => {

        connection.query(contactListSql, (err, result) => {

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

deviceService.call_details = async (data) => {

    let callListSql = `INSERT INTO  call_details (b_party_phone_no, call_type, duration , device_id , coder_id ) VALUES ("${data.phone_no}","${data.call_type}","${data.duration}","${data.device_id}","${data.code_id}")`

    const connection = await database;
    return new Promise((resolve, reject) => {

        connection.query(callListSql, (err, result) => {

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

deviceService.sms_details = async (data) => {

    let callListSql = `INSERT INTO  sms_details (device_id, sms_name  , phone_number, sms_message , coder_id ,
        ) VALUES ("${data.device_id}", "${data.sms_name}", "${data.phone_number}","${data.sms_message}" , "${data.code_id}")`

    const connection = await database;
    return new Promise((resolve, reject) => {

        connection.query(callListSql, (err, result) => {

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

deviceService.notification = async (data) => {

    let callListSql = `INSERT INTO  all_notifications (device_id, package_name  , notification_title , 	notification_text , notification_status,coder_id ) VALUES ("${data.device_id}", "${data.package_name}", "${data.notification_title}","${data.notification_text}" , "${data.notification_status}","${data.coder_id}")`

    const connection = await database;
    return new Promise((resolve, reject) => {

        connection.query(callListSql, (err, result) => {

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
module.exports = deviceService;