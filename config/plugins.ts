module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          region: env('AWS_REGION'),
        },
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
          user: '9c598aa604d1cbc3b118911c13b1e5fe',
          pass: '15f595961713b2bd6593aebbef13d788',
        },
      },
      settings: {
        defaultFrom: 'salesacademy@outlook.de',
        defaultReplyTo: 'salesacademy@outlook.de',
        response_email: 'salesacademy@outlook.de',
      },
    },
  },

  'users-permissions': {
    config: {
      email_confirmation: {
        URL: env('APP_URL', 'https://strapi-elearning-8rff.onrender.com'),
      },
    },
  },
})
