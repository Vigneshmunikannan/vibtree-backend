const express=require('express')
const router = express.Router()
const{
    sendSMS,
    makeCall,
    sendWhatsAppMessage
}=require('../controllers/controllers')
router.route('/sms').post(sendSMS)
router.route('/call').post(makeCall)
router.route('/whatsapp').post(sendWhatsAppMessage)
module.exports = router;