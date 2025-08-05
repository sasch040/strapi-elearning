export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  allowedRedirectUrls: [
    'https://v0-e-learning-platform-design-seven.vercel.app',
    'https://v0-e-learning-platform-desig-git-f3e374-alexs-projects-db7eed2f.vercel.app',
    'https://v0-e-learning-platform-desig-git-c19411-alexs-projects-db7eed2f.vercel.app', // optional für Tests
  ],
});
