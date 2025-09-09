// sendMail.mjs
require("dotenv").config();
const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
// const sesTransport = require('nodemailer-ses-transport');
// const aws = require('aws-sdk');  

// const ses = new aws.SES({
//   apiVersion: "2010-12-01",dsfaddsfadfs
//   region: "us-east-1", // Your region will need to be updated
//   credentials: {
//     accessKeyId: process.env.ACCESS_KEY,
//     secretAccessKey: process.env.SECRET_KEY,
//   },
// });

// create Nodemailer SES transporsster

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// const accessToken = oAuth2Client.getAccessToken();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL_USER,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//     accessToken: accessToken.token
//   }
// });
const USE_MOCK = String(process.env.SAFE_MODE || '').toLowerCase() === 'true'
  || String(process.env.EMAIL_PROVIDER || 'mock').toLowerCase() === 'mock';

const transporter = USE_MOCK
  ? {
      // Minimal mock transporter: prints to console and resolves
      sendMail: (options, cb) => {
        const info = { messageId: `mock-${Date.now()}`, envelope: {}, accepted: [options?.to].filter(Boolean) };
        const out = `\n[mock-email] To: ${options?.to}\nSubject: ${options?.subject}\nText: ${options?.text || ''}\nHTML: ${options?.html || ''}\n`;
        console.log(out);
        if (typeof cb === 'function') return cb(null, info);
        return Promise.resolve(info);
      },
      verify: async () => true,
    }
  : nodemailer.createTransport({
      host: 'mail.privateemail.com',  // Namecheap's SMTP server
      port: 465,  // Port 465 for SSL
      secure: true,  // true for SSL
      auth: {
        user: process.env.DEV_EMAIL_USER,  // Your full Namecheap email address
        pass: process.env.EMAIL_PASSWORD  // Your Namecheap email password
      }
    });

// Test email configuration
const testEmailConfig = async () => {
  try {
    // Verify SMTP connection configuration (no-op for mock)
    await transporter.verify?.();
    console.log(USE_MOCK ? 'Email mock active' : 'SMTP connection verified successfully');

    // Send a test email
    const info = await transporter.sendMail({
      from: process.env.DEV_EMAIL_USER || 'demo@example.com',
      to: process.env.TEST_EMAIL_TO || 'demo@example.com',
      subject: 'Test Email from BXDP',
      text: 'This is a test email to verify the email configuration.',
      html: '<p>This is a test email to verify the email configuration.</p>'
    });

    console.log('Test email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return false;
  }
};

module.exports = { transporter, testEmailConfig };
