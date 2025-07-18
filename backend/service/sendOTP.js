const axios = require('axios')

const sendOtp = async (phone, otp) => {

    // setting state
    let isSend = false;

    // Url to send otp
    const url = 'https://api.managepoint.co/api/sms/send'

    // payload to send
    const payload = {
        'apiKey': 'enter you api code her ',
        'to': phone,
        'message': `Your verification code is ${otp}`
    }

    try {
        const res = await axios.post(url, payload)
        if (res.status === 200) {
            isSend = true;
        }

    } catch (error) {
        console.log('Error Sending OTP', error.message)
    }

    return isSend;



}

module.exports = sendOtp;