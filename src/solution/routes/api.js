const rp = require('request-promise');

module.exports = {
  path: '/getAllBooks',
  method: 'GET',

  handler(request, reply) {
    const promise1 = rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks').then(htmlString => htmlString);
    promise1.then((value) => {
      const resultID = [];
      const parse = JSON.parse(value).books;
      for (let i = 0; i < parse.length; i += 1) {
        resultID.push(parse[i].id);
      }
      const promiseArray = [];
      for (let i = 0; i < resultID.length; i += 1) {
        const promise3 = rp(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${resultID[i]}`).then(htmlString => htmlString);
        promiseArray.push(promise3);
      }
      Promise.all(promiseArray).then((values) => {
        const finalOutput = {};
        for (let i = 0; i < parse.length; i += 1) {
          if (typeof finalOutput[parse[i].Author] === 'undefined') {
            finalOutput[parse[i].Author] = [];
          }
          finalOutput[parse[i].Author].push({
            author: parse[i].Author,
            id: parse[i].id,
            name: parse[i].Name,
            rating: JSON.parse(values[i]).rating,
          });
        }
        reply({ data: finalOutput, statusCode: 200 });
      });
    });
  },
};

