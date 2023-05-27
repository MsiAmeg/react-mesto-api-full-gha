const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const findByIdAndUpdateHandler = (req, res, next, id, body) => {
  Card.findByIdAndUpdate(
    id,
    body,
    { new: true },
  )
    .orFail(new NotFoundError('card not found'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.status(201).send({ data: cards }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) throw new NotFoundError('card not found');
      if (!(card.owner.toString() === _id)) throw new ForbiddenError('access to delete card denied');
      return card.deleteOne({})
        .then((result) => {
          res.send({ data: result });
        });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  findByIdAndUpdateHandler(req, res, next, cardId, { $addToSet: { likes: req.user._id } });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  findByIdAndUpdateHandler(req, res, next, cardId, { $pull: { likes: req.user._id } });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
