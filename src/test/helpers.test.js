const helpers = require('../solution/helpers/helpers');

const allBooksWithRatings = [{
  author: 'J K Rowling', bookId: 1, name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)', rating: 4.45,
}, {
  author: 'J K Rowling', bookId: 2, name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)', rating: 4.38,
}, {
  author: 'Sidney Sheldon', bookId: 8, name: 'If Tomorrow Comes (Tracy Whitney Series, #1)', rating: 4.02,
}, {
  author: 'Sidney Sheldon', bookId: 10, name: 'Tell Me Your Dreams', rating: 3.93,
}, {
  author: 'J K Rowling', bookId: 3, name: 'Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)', rating: 4.54,
}, {
  author: 'J K Rowling', bookId: 4, name: 'Harry Potter and the Goblet of Fire (Harry Potter, #4)', rating: 4.53,
}, {
  author: 'Sidney Sheldon', bookId: 9, name: 'Master of the Game', rating: 4.1,
}, {
  author: 'Sidney Sheldon', bookId: 11, name: 'The Other Side of Midnight (Midnight #1)', rating: 3.9,
}, {
  author: 'J K Rowling', bookId: 5, name: 'Harry Potter and the Order of the Phoenix (Harry Potter, #5)', rating: 4.47,
}, {
  author: 'J K Rowling', bookId: 6, name: 'Harry Potter and the Half-Blood Prince (Harry Potter, #6)', rating: 4.54,
}, {
  author: 'J K Rowling', bookId: 7, name: 'Harry Potter and the Deathly Hallows (Harry Potter, #7)', rating: 4.62,
}, {
  author: 'Sidney Sheldon', bookId: 12, name: 'Rage of Angels', rating: 3.92,
}];

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

  test('getAllBooksRatings function should return promise', () => {
    const promise = helpers.getAllBooksArray().then((allBooksArray) => {
      helpers.getAllBooksRatings(allBooksArray);
      expect(typeof promise.then === 'function').toBe(true);
    });
  });
  test('getAllBooksWithRating function returns the array of book objects including rating', () => {
    helpers.getAllBooksArray().then((allBooksArray) => {
      helpers.getAllBooksRatings(allBooksArray).then((allBooksRatings) => {
        const allBooksandRatings = helpers.getAllBooksWithRatings(allBooksArray, allBooksRatings);
        expect(allBooksandRatings).toEqual(allBooksWithRatings);
      });
    });
  });
});
