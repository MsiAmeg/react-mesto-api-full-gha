const config = {
  PORT: 3000,
  URL_PATTERN: "^https?:\\/\\/(www.)?[\\da-z\\-\\.\\_\\~\\:\\/\\?\\#\\[\\]@\\!\\$\\&\\'\\(\\)\\*\\,\\;\\=]{2,}#?$",
  SECRET_KEY: '8924c2c6c6792d5e3355ee3f6a6b5a817b9d00b8',
  DEFAULT_ALLOWED_METHODS: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  ALLOWED_CORS: [
    'https://api.rekunir.frontend.nomoredomains.rocks',
    'https://rekunir.frontend.nomoredomains.rocks',
    'http://localhost:3000',
  ],
};

module.exports = config;
