const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const PROVIDER = (process.env.STORAGE_PROVIDER || 'mock').toLowerCase();

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// Mock implementation writes files locally and returns a local URL
const mock = {
  async uploadBuffer(key, buffer, contentType = 'application/octet-stream') {
    const baseDir = path.join(__dirname, '../../.mock_uploads');
    ensureDir(baseDir);
    const safeKey = key.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = path.join(baseDir, safeKey);
    await fs.promises.writeFile(filePath, buffer);
    const prefix = process.env.CUSTOM_DOMAIN || 'http://localhost:5001/mock/';
    return `${prefix}${encodeURIComponent(safeKey)}`;
  },
  async getPresignedPutUrl(key) {
    // For mock, a fake URL clients can PUT to is not needed; just return a placeholder
    const prefix = process.env.CUSTOM_DOMAIN || 'http://localhost:5001/mock/';
    return `${prefix}${encodeURIComponent(key)}`;
  }
};

// S3 implementation (uses environment variables; best-effort only)
const s3Provider = (() => {
  try {
    const region = process.env.AWS_REGION || process.env.REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.SECRET_KEY;
    if (region && accessKeyId && secretAccessKey) {
      AWS.config.update({ region, accessKeyId, secretAccessKey });
    }
    const s3 = new AWS.S3();
    return {
      async uploadBuffer(key, buffer, contentType = 'application/octet-stream') {
        const Bucket = process.env.BUCKET_NAME;
        if (!Bucket) throw new Error('BUCKET_NAME not set');
        const params = { Bucket, Key: key, Body: buffer, ContentType: contentType };
        const result = await s3.upload(params).promise();
        const domain = process.env.CUSTOM_DOMAIN || '';
        if (domain) {
          const objectKey = result.Key || key;
          return `${domain}${objectKey}`;
        }
        return result.Location;
      },
      async getPresignedPutUrl(key) {
        const Bucket = process.env.BUCKET_NAME;
        if (!Bucket) throw new Error('BUCKET_NAME not set');
        const params = { Bucket, Key: key, Expires: 120, ContentType: 'image/jpeg' };
        return await s3.getSignedUrlPromise('putObject', params);
      }
    };
  } catch (e) {
    // Fallback to mock on any failure
    return mock;
  }
})();

module.exports = PROVIDER === 's3' ? s3Provider : mock;

