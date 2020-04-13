const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'development';
const { GMAIL } = require('../config/config.json')[env];
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth:GMAIL, 
    tls: { rejectUnauthorized: false }
});
module.exports = transporter;