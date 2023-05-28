const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, SECRET_KEY } = process.env;

const findByIdHandler = (req, res, next, id) => {
  User.findById({ _id: id })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('user not found');
      }
    })
    .catch(next);
};

const findByIdAndUpdateHandler = (req, res, next, id, body) => {
  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('user not found'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('user not found'))
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserMe = (req, res, next) => {
  const { _id } = req.user;

  findByIdHandler(req, res, next, _id);
};

const getUserById = (req, res, next) => {
  const { id } = req.params;

  findByIdHandler(req, res, next, id);
};

const updateUserById = (req, res, next) => {
  const { name, about } = req.body;

  findByIdAndUpdateHandler(req, res, next, req.user._id, { name, about });
};

const updateUserAvatarById = (req, res, next) => {
  const { avatar } = req.body;

  findByIdAndUpdateHandler(req, res, next, req.user._id, { avatar });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      const userParsed = {
        email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      };
      res.status(201).send({ data: userParsed });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('login or password incorrect');
      }
      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (!isValid) {
            throw new UnauthorizedError('login or password incorrect');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_KEY : config.SECRET_KEY, { expiresIn: '7d' });

          return res.status(200).cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'none' }).send({ _id: user._id });
        });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  updateUserAvatarById,
  login,
  getUserMe,
};
