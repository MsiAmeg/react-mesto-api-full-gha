const router = require('express').Router();
const { celebrate } = require('celebrate');
const cardIdRules = require('../validationRules/cardId');
const createCardRules = require('../validationRules/createCard');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', celebrate(createCardRules), createCard);
router.delete('/:cardId', celebrate(cardIdRules), deleteCard);
router.put('/:cardId/likes', celebrate(cardIdRules), likeCard);
router.delete('/:cardId/likes', celebrate(cardIdRules), dislikeCard);

module.exports = router;
