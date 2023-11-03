const Phrase = require('../models/phrase.model')

const getCategories = (request, response) => {
  Phrase
    .distinct("categories")
    .then((result) => {
      response.status(200).json({
        status: 200,
        message: 'ok',
        categories: result
      })
    })
    .catch(() => {
      response.status(500).json({
        status: 500,
        message: 'Error, please try again later.',
        categories: []
    });
  });
}

module.exports = getCategories;
