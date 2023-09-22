const twilio = require('twilio');
const dotenv = require('dotenv').config();
// Replace these with your actual Twilio credentials
const accountSid = process.env.SID;
const authToken = process.env.AUTHTOKEN;
const twilioPhoneNumber =process.env.NO ;

const client = twilio(accountSid, authToken);

const sendSMS = async (req, res) => {
  try {
    const body="Hello there this is sample message created by vignesh"
    const { to} = req.body;
  console.log(to,body)
    const message = await client.messages.create({
      body,
      from: twilioPhoneNumber,
      to,
    });

    // SMS sent successfully
    res.status(200).json({ message: 'SMS sent successfully', messageId: message.sid });
  } catch (error) {
    console.error('Error sending SMS:', error.data);

    // Handle different error scenarios and send appropriate responses
    if (error.code === 21211) {
      // Twilio Error 21211: Invalid 'to' phone number
      res.status(400).json({ error: 'Invalid phone number' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};






const makeCall = async (req, res) => {

  try {
    const { to} = req.body;

    // Make a call using Twilio
    const call = await client.calls.create({
      twiml:'<Response><Say>Hello there this is sample message created by vignesh</Say><Dial>+919751205230</Dial></Response>', 
      to,
      from: twilioPhoneNumber,
    });
    // Call initiated successfully
    res.status(200).json({ message: 'Call initiated successfully', callSid: call.sid });
  } catch (error) {
    console.error('Error making a call:', error);

    // Handle different error scenarios and send appropriate responses
    if (error.code === 21211) {
      // Twilio Error 21211: Invalid 'to' phone number
      res.status(400).json({ error: 'Invalid phone number' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};




const sendWhatsAppMessage = async (req,res) => {
  try {
    // const { to} = req.body;
    const body="Hello there this is sample message created by vignesh"
    const { to} = req.body;
    const message = await client.messages.create({
      body: body,
      from: `whatsapp:+14155238886`,
      to: `whatsapp:${to}`,
    });
    console.log(message)

    console.log(`WhatsApp message sent with SID: ${message.sid}`);
    res.status(200).json({ message: 'WhatsApp message sent successfully', messageId: message.sid });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);

    // Handle different error scenarios and send appropriate responses
    if (error.code === 21211) {
      // Twilio Error 21211: Invalid 'to' phone number
      res.status(400).json({ error: 'Invalid phone number' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = { sendSMS,makeCall,sendWhatsAppMessage };
