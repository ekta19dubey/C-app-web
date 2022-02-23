const device = require('../service/device.service')
const querystring = require('querystring');
const { addDaysToDate, getAuthToken, getErrorObject, getSuccessObject, sendEmail } = require('../Config/utils')
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const jwt = require('jsonwebtoken');
const { call_details } = require('../service/device.service');
const drypted_data = require('../Config/decrypt');
console.log("user.controler");

const deviceController = {};


deviceController.register_device = async (req, res) => {
    console.log(req.body)

    let d = await drypted_data.decrypt(req.body.encrepted_data, req.body.code_id);
    let decrypted_data = JSON.parse(d)
    //console.log(decrypted_data.imei)
    try {

        let data = {
            coder_id: req.body.code_id,
            imei: decrypted_data.imei,
            imsi: decrypted_data.imsi,
            phone_number: decrypted_data.phone_number,
            operator_type: decrypted_data.operator_type,
            android_id: decrypted_data.android_id,
            new_device_id: decrypted_data.new_device_id,
            old_device_id: decrypted_data.old_device_id
        }
        // active_staus: decrypted_data.active_staus,
        // is_media: decrypted_data.is_media,
        // audio_recoding_status: decrypted_data.audio_recoding_status,
        // screen_recording_status: decrypted_data.screen_recording_status,


        let result = await device.register_device(data);

        if (result) {
            res.send(getSuccessObject({ device_id: result.insertId }));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }




    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}

deviceController.contact_list = async (req, res) => {
    console.log("Contact detsails==>" + JSON.stringify(req.body))

    let d = await drypted_data.decrypt(req.body.encrepted_data, req.body.code_id);
    let decrypted_data = JSON.parse(d)
    console.log(decrypted_data)
    let a = 0;
    // const body = req.body
    try {
        if (decrypted_data && decrypted_data.ContactList && decrypted_data.ContactList.length > 0) {
            decrypted_data.ContactList.forEach((element) => {
                console.log("element===>" + element)
                a = a + 1
                let data = {
                    device_id: decrypted_data.device_id,
                    person_name: element.person_name,
                    phone_number: element.phone_number,
                    code_id: req.body.code_id,
                }

                //let result = device.

                let result = device.contact_list(data);
                //console.log(decrypted_data.ContactList.length + "==" + a)
                if (decrypted_data.ContactList.length == a) {
                    if (result) {
                        res.send(getSuccessObject(result));

                    } else {

                        res.status(400).send({ message: 'opps error', data: result })
                    }
                }
            });
        } else {
            res.status(400).send({ message: 'opps error', data: result })

        }
    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}

deviceController.call_details = async (req, res) => {
    console.log("call-Details" + JSON.stringify(req.body))
    let d = await drypted_data.decrypt(req.body.encrepted_data, req.body.code_id);
    let decrypted_data = JSON.parse(d)
    console.log(decrypted_data)
    try {


        let a = 0;
        decrypted_data.calldetails.forEach((element) => {
            console.log("element===>" + element)
            a = a + 1
            let data = {
                code_id: req.body.code_id,
                phone_no: element.phone_no,
                call_type: element.call_type,
                duration: element.duration,
                device_id: decrypted_data.device_id,
                // call_date_time: decrypted_data.call_date_time
            };
            let result = device.call_details(data);;
            console.log(decrypted_data.calldetails.length + "==" + a)
            if (decrypted_data.calldetails.length == a) {
                if (result) {
                    res.send(getSuccessObject(result));

                } else {

                    res.status(400).send({ message: 'opps error', data: result })
                }
            }
        });



    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}

deviceController.sms_details = async (req, res) => {
    console.log(req.body)
    const body = req.body
    try {

        // let data = {

        // };

        let result = await device.sms_details(body);
        if (result) {
            res.send(getSuccessObject(result));

        } else {

            res.status(400).send({ message: 'opps error', data: result })
        }




    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}

deviceController.notification = async (req, res) => {
    console.log(req.body)
    const body = req.body
    try {

        // let data = {

        // };

        let result = await device.notification(body);

        if (result) {
            res.send(getSuccessObject(result));

        } else {

            res.status(400).send({ message: 'opps error', data: result })
        }

    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}
module.exports = deviceController;