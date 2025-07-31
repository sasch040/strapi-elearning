const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@strapi/provider-upload-aws-s3');

module.exports = ({ env }) => {
  const s3Client = new S3Client({
    region: env('AWS_REGION'),
    credentials: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
    },
    maxAttempts: 3, // AWS SDK-integrierte Retry-Anzahl
  });

  return {
    upload: {
      config: {
        provider: '@strapi/provider-upload-aws-s3',
        providerOptions: {
          s3Client, // übergib den Client direkt mit Retry
          params: {
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
    },
  };
};
