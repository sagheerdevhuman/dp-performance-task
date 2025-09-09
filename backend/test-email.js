require('dotenv').config();
const { testEmailConfig } = require('./config/email');

console.log('Starting Namecheap SMTP configuration test...');
console.log('Using email configuration:');
console.log('- SMTP Host:', 'mail.privateemail.com');
console.log('- Port:', 465);
console.log('- From:', process.env.DEV_EMAIL_FROM);
console.log('- To:', process.env.TEST_EMAIL_TO);

testEmailConfig()
  .then(success => {
    if (success) {
      console.log('✅ Email configuration test completed successfully!');
      console.log('✅ SMTP connection verified');
      console.log('✅ Test email sent');
    } else {
      console.log('❌ Email configuration test failed.');
      console.log('Please check your environment variables:');
      console.log('- DEV_EMAIL_USER (your full Namecheap email address)');
      console.log('- EMAIL_PASSWORD (your Namecheap email password)');
      console.log('- DEV_EMAIL_FROM');
      console.log('- TEST_EMAIL_TO');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Unexpected error during test:', error);
    process.exit(1);
  }); 