var https = require('https');

let accessHTTPAsync = (getURL, testCallback) => {
    https.get(getURL, (response) => {
      response.setEncoding('UTF8');
      let retData = [];
      response.on('data', (data) => {
        retData.push(data);
         console.log(data);
        testCallback('DATA');
      });
      response.on('error', (error) => {
        console.log(error);
        testCallback('ERROR');
      });
    });
  };
module.exports = {
    path: '/getAllBooksFromAPI1',
    method: 'GET',

    handler:function(request,reply) {
        let callback = (data) => {
           console.log(data)
           reply({
               data:data,
               statusCode:200
           })
          };
       accessHTTPAsync('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks',callback);
    }
}