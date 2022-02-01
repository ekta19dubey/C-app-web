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
            res.send(getSuccessObject(result));

        } else {

            res.status(400).send({ message: 'Device not registered', data: result })
        }




    } catch (err) {
        console.log(err);
    }
}

controller.contact_list = async (req, res) => {
    console.log(req.body.device_id)
    try {
        let result = await User.contact_list(req.body.device_id);
        // console.log("ekta==>" + JSON.stringify(result))
        if (result) {
            res.send(getSuccessObject(result));

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
    console.log(req.body.device_id)
    try {
        let result = await User.call_details(req.body.device_id);
        // console.log("ekta==>" + JSON.stringify(result))
        if (result) {
            res.send(getSuccessObject(result));

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