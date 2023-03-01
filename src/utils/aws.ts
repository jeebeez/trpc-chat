import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
});

export default s3;
