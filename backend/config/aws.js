require("dotenv").config();
const AWS = require('aws-sdk');

const region = process.env.AWS_REGION || process.env.REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.SECRET_KEY;

if (region && accessKeyId && secretAccessKey) {
  AWS.config.update({ accessKeyId, secretAccessKey, region });
}

const s3 = new AWS.S3();
module.exports = { s3 };
