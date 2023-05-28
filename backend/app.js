require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const config = require('./config');
const { createUser, login } = require('./controllers/user');
const { signInRules, signUpRules } = require('./validationRules/auth');
const NotFoundError = require('./errors/NotFoundError');

const { NODE_ENV, PORT } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use((req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (config.ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', config.DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate(signInRules), login);

app.post('/signup', celebrate(signUpRules), createUser);

app.use(require('./middlewares/auth'));

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use('*', ((req, res, next) => {
  const err = new NotFoundError('invalid url');
  return next(err);
}));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/error'));

app.listen(NODE_ENV === 'production' ? PORT : config.PORT);
