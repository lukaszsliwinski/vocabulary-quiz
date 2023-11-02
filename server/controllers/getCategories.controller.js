const Phrase = require('../models/phrase.model')

const getCategories = (request, response) => {
  Phrase
    .distinct("categories")
    .then((result) => {
      console.log(result)

      response.status(200).json({
        status: 200,
        message: 'ok',
        categories: result
      })
    })
    .catch((error) => {
      console.log(error);

      // sprawdzić kod błędu - poniżej tymczasowo!!!
      response.status(404).json({
        status: 404,
        message: 'error',
        categories: []
    });
  });
}

module.exports = getCategories;
