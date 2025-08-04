module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      },
    },
  },

  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'in-v3.mailjet.com',
        port: 587,
        secure: false,
        auth: {
          user: '9e756c0f01ecb0e9935e77f28cd54aea1',
          pass: '0fab5d60571c96d4240db92a62cfb1da',
        },
      },
      settings: {
        defaultFrom: 'salesacademy@outlook.de',
        defaultReplyTo: 'salesacademy@outlook.de',
      },
    },
  },
});
