
const Models = require('../../../models');
const helpers = require('../helpers/helpers');

module.exports = [
  {
    path: '/Books/BooksWithRatings',
    method: 'GET',
    handler(request, reply) {
      helpers.getAllBooksArray().then((allBooksArray) => {
        helpers.getAllBooksRatings(allBooksArray).then((allBooksRatings) => {
          const allBooksWithRatings = helpers.getAllBooksWithRatings(allBooksArray, allBooksRatings);
          const finalOutput = helpers.getAllBooksGroupedByAuthor(allBooksWithRatings);
          reply({ data: finalOutput, status_code: 200 });
        });
      });
    },
  },
  {
    path: '/Books/BookDetails',
    method: 'POST',
    handler(request, reply) {
      helpers.getAllBooksArray().then((allBooksArray) => {
        helpers.getAllBooksRatings(allBooksArray).then((allBooksRatings) => {
          const allBooksWithRatings = helpers.getAllBooksWithRatings(allBooksArray, allBooksRatings);
          allBooksWithRatings.map((books) => {
            Models.Novels.upsert(books);
          });
          reply({ message: 'Data Inserted', status_code: 201 });
        });
      });
    },
  },
  {
    path: '/retrieve',
    method: 'POST',
    handler(request, response) {
      helpers.getAllBooksArray().then((allBooksArray) => {
        helpers.getAllBooksRatings(allBooksArray).then((allBooksRatings) => {
          const allBooksWithRatings = helpers.getAllBooksWithRatings(allBooksArray, allBooksRatings);
          allBooksWithRatings.map((books) => {
            Models.Novels.upsert(books);
          });
          Models.Novels.findAll({
            attributes: ['author', 'name', 'bookId', 'rating'],
          }).then((booksArray) => {
            console.log(booksArray);
            response({
              booksArray,
              statusCode: 200,
            });
          }).catch(err => console.log(err));
        });
      });
    },
  },
  {
    path: '/Books/Like/{bookId}',
    method: 'POST',
    handler(request, reply) {
      Models.Likes.upsert({
        bookId: request.params.bookId,
        likes: 1,
      }).then(() => reply({ message: 'Liked', status_code: 200 })).catch(() =>
        reply({ message: 'Invalid bookId to like', status_code: 500 }));
    },
  },
  {
    path: '/Books/Unlike/{bookId}',
    method: 'POST',
    handler(request, reply) {
      Models.Likes.upsert({
        bookId: request.params.bookId,
        likes: 0,
      }).then(() => reply({ message: 'Unliked', status_code: 200 })).catch(() =>
        reply({ message: 'Invalid bookId to unlike', status_code: 500 }));
    },
  },
];
