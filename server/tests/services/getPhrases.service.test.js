// Get phrases service unit test

const Phrase = require('../../models/phrase.model');
const { getPhrasesByCategory, formatResult } = require('../../services/getPhrases.service');
const mockPhrases = require('../__mocks__/mockPhrases');
const formattedPhrases = require('../__mocks__/formattedPhrases');

describe('getPhrases.service', () => {
  it('should get phrases by category', async () => {
    // mock Mongoose aggregate method to return fake categories
    Phrase.aggregate = jest.fn().mockResolvedValue(mockPhrases);

    // call the service function
    const result = await getPhrasesByCategory('technical');

    // check if the result matches mocked data
    expect(result).toEqual(mockPhrases);
  });

  it('should format phrases', () => {
    // call formatResult function
    const result = formatResult(mockPhrases);

    // check if the result matches mocked data
    expect(result).toEqual(formattedPhrases);
  });
});
