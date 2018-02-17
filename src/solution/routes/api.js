const rp = require('request-promise');
const Models = require('../../../models');

const getAllBooksArray = () => {
  const promise1 = rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks').then(htmlString => htmlString);
  return (promise1.then((value) => {
    const allBooksArray = JSON.parse(value).books;
    return allBooksArray;
  }));
};
const getAllBooksRatings = (allBooksArray) => {
  const promiseArray = [];
  for (let i = 0; i < allBooksArray.length; i += 1) {
    const promise3 = rp(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${allBooksArray[i].id}`).then(htmlString => htmlString);
    promiseArray.push(promise3);
  }
  return Promise.all(promiseArray);
};
const getAllBooksWithRatings = (allBooksArray, allBooksRatings) => {
  const allBooksWithRatings = [];
  for (let i = 0; i < allBooksArray.length; i += 1) {
    allBooksWithRatings.push({
      author: allBooksArray[i].Author,
      id: allBooksArray[i].id,
      name: allBooksArray[i].Name,
      rating: JSON.parse(allBooksRatings[i]).rating,
    });
  }
  return allBooksWithRatings;
};
const getAllBooksGroupedByAuthor = (allBooksWithRatings) => {
  const finalOutput = {};
  for (let i = 0; i < allBooksWithRatings.length; i += 1) {
    if (typeof finalOutput[allBooksWithRatings[i].author] === 'undefined') {
      finalOutput[allBooksWithRatings[i].author] = [];
    }
    finalOutput[allBooksWithRatings[i].author].push({
      author: allBooksWithRatings[i].author,
      id: allBooksWithRatings[i].id,
      name: allBooksWithRatings[i].name,
      rating: allBooksWithRatings[i].rating,
    });
  }
  return finalOutput;
};
module.exports = [
  {
    path: '/Books/BooksWithRatings',
    method: 'GET',
    handler(request, reply) {
      getAllBooksArray().then((allBooksArray) => {
        getAllBooksRatings(allBooksArray).then((allBooksRatings) => {
          const allBooksWithRatings = getAllBooksWithRatings(allBooksArray, allBooksRatings);
          const final = getAllBooksGroupedByAuthor(allBooksWithRatings);
          const finalOutput = final;
          reply({ data: finalOutput, statusCode: 200 });
        });
      });
    },
  },
  {
    path: '/Books/BookDetails',
    method: 'POST',
    handler(request, reply) {
      getAllBooksArray().then((allBooksArray) => {
        getAllBooksRatings(allBooksArray).then((allBooksRatings) => {
          const allBooksWithRatings = getAllBooksWithRatings(allBooksArray, allBooksRatings);
          Models.library.bulkInsert(allBooksWithRatings);
        });
      });
    },
  },
];

