const server = require('../../src/solution/server');

const JSONResponseFromAPI1 = {
  'J K Rowling':
         [{
           author: 'J K Rowling',
           id: 1,
           name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)',
           rating: 4.45,
         },
         {
           author: 'J K Rowling',
           id: 2,
           name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
           rating: 4.38,
         },
         {
           author: 'J K Rowling',
           id: 3,
           name: 'Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)',
           rating: 4.54,
         },
         {
           author: 'J K Rowling',
           id: 4,
           name: 'Harry Potter and the Goblet of Fire (Harry Potter, #4)',
           rating: 4.53,
         },
         {
           author: 'J K Rowling',
           id: 5,
           name: 'Harry Potter and the Order of the Phoenix (Harry Potter, #5)',
           rating: 4.47,
         },
         {
           author: 'J K Rowling',
           id: 6,
           name: 'Harry Potter and the Half-Blood Prince (Harry Potter, #6)',
           rating: 4.54,
         },
         {
           author: 'J K Rowling',
           id: 7,
           name: 'Harry Potter and the Deathly Hallows (Harry Potter, #7)',
           rating: 4.62,
         }],
  'Sidney Sheldon':
         [{
           author: 'Sidney Sheldon',
           id: 8,
           name: 'If Tomorrow Comes (Tracy Whitney Series, #1)',
           rating: 4.02,
         },
         {
           author: 'Sidney Sheldon',
           id: 10,
           name: 'Tell Me Your Dreams',
           rating: 3.93,
         },
         {
           author: 'Sidney Sheldon',
           id: 9,
           name: 'Master of the Game',
           rating: 4.1,
         },
         {
           author: 'Sidney Sheldon',
           id: 11,
           name: 'The Other Side of Midnight (Midnight #1)',
           rating: 3.9,
         },
         {
           author: 'Sidney Sheldon',
           id: 12,
           name: 'Rage of Angels',
           rating: 3.92,
         }],
};
describe('Testing the Hapi server that processes the requests', () => {
  test('Should return 200 status code for successful get request', (done) => {
    const options = {
      method: 'GET',
      url: '/Books/BooksWithRatings',
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(200);
      done();
    });
  });
  test('Should return correct response for successful get request', (done) => {
    const options = {
      method: 'GET',
      url: '/Books/BooksWithRatings',
    };
    server.inject(options, (response) => {
      expect(response.result.data).toEqual(JSONResponseFromAPI1);
      done();
    });
  });
  test('Should return correct response for successful post request', (done) => {
    const options = {
      method: 'POST',
      url: '/Books/BookDetails',
    };
    server.inject(options, (response) => {
      expect(response.result.message).toEqual('Data Inserted');
      done();
    });
  });
  test('Should return correct status code for successful post request', (done) => {
    const options = {
      method: 'POST',
      url: '/Books/BookDetails',
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(201);
      done();
    });
  });
});
