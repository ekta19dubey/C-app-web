const express = require('express')
const userController = require('../Controllers/user.controller')
const verifyToken = require('../middleware/auth')
const bodyParser = require('body-parser')

console.log('router call');

const router = express.Router()
// app.use(bodyParser.json())
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// )
router.post('/register', userController.user_register)

router.post('/esign', userController.user_login)

router.post('/edvulst', verifyToken, userController.device_list)

router.post('/ecntctudtls', verifyToken, userController.contact_list);

router.post('/ecludtls', verifyToken, userController.call_details);

router.post('/esmsudtls', verifyToken, userController.sms_details);

router.post('/ealnoti', verifyToken, userController.notification);

module.exports = router;