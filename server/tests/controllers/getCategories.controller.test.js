// Get categories controller unit test

const getCategories = require('../../controllers/getCategories.controller');
const { aggregateCategories } = require('../../services/getCategories.service');
const mockCategories = require('../__mocks__/mockCategories');

jest.mock('../../services/getCategories.service');

describe('getCategories.controller', () => {
  it('should return 200 with categories', async () => {
    // mock service to return fake categories
    aggregateCategories.mockResolvedValue(mockCategories);

    const request = {};
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // call controller
    await getCategories(request, response);

    // check response
    expect(response.json).toHaveBeenCalledWith({
      status: 200,
      message: 'ok',
      categories: mockCategories
    });
  });
});
