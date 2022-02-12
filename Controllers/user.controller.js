const User = require('../service/user.service')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const { addDaysToDate, getAuthToken, getErrorObject, getSuccessObject, sendEmail } = require('../Config/utils')
const jwt = require('jsonwebtoken');
const { Console } = require('winston/lib/winston/transports');
console.log("user.controler");

const controller = {};



controller.user_register = async (req, res) => {
    console.log(req.body)
    try {
        // Get user input
        const data =
        {
            email: req.body.email,
            password: req.body.password
        };

        // Validate user input
        if (!(data.email && data.password)) {
            res.status(400).send("All input is required");
        }

        //  let result = await user.register_user(email);
        let result = await User.userChecking(data.email.toLowerCase());
        if (result.length == 0) {

            //Encrypt user password
            encryptedPassword = await bcrypt.hash(data.password, 10);

            console.log('====================================');
            console.log(encryptedPassword);
            console.log('====================================');
            // Create user in our database
            const user = await User.user_register(
                data.email.toLowerCase(), // sanitize: convert email to lowercase
                encryptedPassword
            );


            // Create token
            const token = jwt.sign(
                { user_id: user._id },
                "ektatesting",
                {
                    expiresIn: "7d",
                }
            );
            // save user token
            user.token = token;
            res.send(getSuccessObject({ token: user }));
            // return new user
            //res.status(201).json(user);

        }




    } catch (err) {
        console.log(err);
    }
}


controller.user_login = async (req, res) => {
    console.log(req.body)
    //console.log("user_register body")
    try {
        // Get user input
        const data =
        {
            email: req.body.email,
            password: req.body.password
        };

        // Validate user input
        if (!(data.email && data.password)) {
            res.status(400).send("All input is required");
        }

        let user = await User.userChecking(data.email.toLowerCase());
        let respond_data = user.find(res => {
            return res
        })
        if (respond_data) {
            const result = bcrypt.compareSync(req.body.password, respond_data.password);

            if (result) {
                const token = jwt.sign(
                    { user_id: user._id },
                    "ektatesting",
                    {
                        expiresIn: "7d",
                    }
                );


                // user
                res.send(getSuccessObject({ token: token }));
            } else {
                res.send({
                    message: ' wrong password',

                })
            }

        } else {
            res.send({
                message: 'please enter password'
            })
        }


    } catch (err) {
        console.log(err);
    }


}

controller.device_list = async (req, res) => {
    // console.log(req.body)
    try {
        let result = await User.device_list();
        console.log(result)
        if (result) {
            res.send(getSuccessObject(result));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }




    } catch (err) {
        console.log(err);
    }
}

controller.device_list = async (req, res) => {
    // console.log(req.body)
    try {
        let result = await User.device_list();
        console.log(result)
        if (result) {
            console.log('ok')

            res.send(getSuccessObject(result));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }




    } catch (err) {
        console.log(err);
    }
}

controller.contact_list = async (req, res) => {
    console.log(req.body)

    const data = {
        device_id: req.body.device_id,
        limit: req.body.limit,
        offset: req.body.offset
    }
    try {
        let result = await User.contact_list(data);
        let totalCount = await User.total_count('contact_details');
        //  console.log("" + totalCount[0].count)
        let count = totalCount[0].count - data.offset;
        console.log("ekta==>" + count + totalCount[0].count)
        if (result) {
            res.send(getSuccessObject({ "total_count": count, result }));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }

    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}

controller.call_details = async (req, res) => {
    console.log(req.body)
    //console.log(req.body)

    const data = {
        device_id: req.body.device_id,
        limit: req.body.limit,
        offset: req.body.offset
    }
    try {
        let result = await User.call_details(data);
        let totalCount = await User.total_count('call_details');
        // console.log("ekta==>" + JSON.stringify(result))
        let count = totalCount[0].count - data.offset;
        if (result) {
            res.send(getSuccessObject({ "total_count": count, result }));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }

    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}



controller.sms_details = async (req, res) => {
    console.log(req.body)
    //console.log(req.body)

    const data = {
        device_id: req.body.device_id,
        limit: req.body.limit,
        offset: req.body.offset
    }
    try {
        let result = await User.sms_details(data);
        let totalCount = await User.total_count('sms_details');
        // console.log("ekta==>" + JSON.stringify(result))
        let count = totalCount[0].count - data.offset;
        if (result) {
            res.send(getSuccessObject({ "total_count": count, result }));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }

    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}

controller.notification = async (req, res) => {
    console.log(req.body)
    //console.log(req.body)

    const data = {
        device_id: req.body.device_id,
        limit: req.body.limit,
        offset: req.body.offset
    }
    try {
        let result = await User.notification(data);
        let totalCount = await User.total_count('all_notifications');
        console.log("ekta==>" + JSON.stringify(result))
        let count = totalCount[0].count - data.offset;
        if (result) {
            res.send(getSuccessObject({ "total_count": count, result }));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }

    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}


controller.ealwp = async (req, res) => {
    console.log(req.body)
    //console.log(req.body)

    const data = {
        device_id: req.body.device_id,
        limit: req.body.limit,
        offset: req.body.offset
    }
    try {
        let result = await User.ealwp(data);
        let totalCount = await User.total_count('whatsapp');
        console.log("ekta==>" + JSON.stringify(result))
        let count = totalCount[0].count - data.offset;
        if (result) {
            res.send(getSuccessObject({ "total_count": count, result }));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }

    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}

controller.ealins = async (req, res) => {
    console.log(req.body)
    //console.log(req.body)

    const data = {
        device_id: req.body.device_id,
        limit: req.body.limit,
        offset: req.body.offset
    }
    try {
        let result = await User.ealins(data);
        let totalCount = await User.total_count('instagram');
        console.log("ekta==>" + JSON.stringify(result))
        let count = totalCount[0].count - data.offset;
        if (result) {
            res.send(getSuccessObject({ "total_count": count, result }));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }

    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}
controller.ealfb = async (req, res) => {
    console.log(req.body)
    //console.log(req.body)

    const data = {
        device_id: req.body.device_id,
        limit: req.body.limit,
        offset: req.body.offset
    }
    try {
        let result = await User.ealfb(data);
        let totalCount = await User.total_count('facebook');
        console.log("ekta==>" + JSON.stringify(result))
        let count = totalCount[0].count - data.offset;
        if (result) {
            res.send(getSuccessObject({ "total_count": count, result }));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }

    }
    catch (err) {
        console.log(err)
        //   logger.error('Error in registering user- ', err);
        // res.status(400).send({ message: 'Device not registered', data: err })
        //res.send(getErrorObject(500, err));
    }
}

module.exports = controller;