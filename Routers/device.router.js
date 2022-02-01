const express = require('express')
const divController = require('../Controllers/device.controller')
const bodyParser = require('body-parser')

console.log('router call');

const router = express.Router()
// app.use(bodyParser.json())
// app.use(
//     bodyParser.urlencoded({
//         extended: true,
//     })
// )
router.post('/edvnlst', divController.register_device);

router.post('/ecntctndtls', divController.contact_list);

router.post('/eclndtls', divController.call_details);

router.post('/esmsndtls', divController.sms_details);

router.post('/ealnoti', divController.notification);

module.exports = router;