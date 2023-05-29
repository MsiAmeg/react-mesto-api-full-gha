const router = require('express').Router();
const { celebrate } = require('celebrate');
const userIdRules = require('../validationRules/userId');
const userMeRules = require('../validationRules/userMe');
const userMeAvatarRules = require('../validationRules/userMeAvatar');
const {
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
  getUserMe,
  signout,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/me/signout', signout);

router.get('/:id', celebrate(userIdRules), getUserById);

router.patch('/me', celebrate(userMeRules), updateUserById);

router.patch('/me/avatar', celebrate(userMeAvatarRules), updateUserAvatarById);

module.exports = router;
