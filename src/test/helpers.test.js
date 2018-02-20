const helpers = require('../solution/helpers/helpers');

describe('Testing the helpers functions used in API1 and API2', () => {
  test('AllbooksArray function should return promise', () => {
    expect(typeof helpers.getAllBooksArray().then === 'function').toBe(true);
  });
  test('getAllBooksRatings function should return promise', () => {
    const promise = helpers.getAllBooksArray().then((allBooksArray) => {
      helpers.getAllBooksRatings(allBooksArray);
      expect(typeof promise.then === 'function').toBe(true);
    });
  });
});
