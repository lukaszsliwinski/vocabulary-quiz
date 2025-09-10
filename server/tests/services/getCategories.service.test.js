// Get categories service unit test

const Phrase = require('../../models/phrase.model');
const { aggregateCategories } = require('../../services/getCategories.service');
const mockCategories = require('../__mocks__/mockCategories');

describe('getCategories.service', () => {
  it('should return a list of categories', async () => {
    // mock Mongoose aggregate method to return fake categories
    Phrase.aggregate = jest.fn().mockResolvedValue(mockCategories);

    // call the service function
    const result = await aggregateCategories();

    // check if the result matches mocked data
    expect(result).toEqual(mockCategories);
  });
});
