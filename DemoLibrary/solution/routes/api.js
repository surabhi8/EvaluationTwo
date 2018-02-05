var https = require('https');
var rp = require('request-promise');
let accessHTTPAsync = (getURL, testCallback) => {
    https.get(getURL, (response) => {
      response.setEncoding('UTF8');
      let retData = [];
      response.on('data', (data) => {
        retData.push(data);
        testCallback(retData);
      });

      response.on('error', (error) => {
        console.log(error);
        testCallback('ERROR');
      });
    });
  };
module.exports = {
    path: '/getAllBooks',
    method: 'GET',

    handler:function(request,reply) {
        var promise1 =  rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks').then(function (htmlString) {
            return htmlString;
        });
        promise1.then(function(value){
             let resultID =[]
             let resultRating = []
             //console.log("Hello"+JSON.parse(value).books)
              let parse = JSON.parse(value).books
             for(let i=0;i<parse.length;i++) {
                 resultID.push(parse[i].id);
        }
        console.log(resultID)    
        let promiseArray = []
        for(var i=0;i<resultID.length;i++){
        var promise3 =  rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/'+resultID[i]).then(function (htmlString) {
            return htmlString;
        });
        promiseArray.push(promise3)
        }
        Promise.all(promiseArray).then(function(values) {
            const finalOutput = {};
            for(let i=0;i<parse.length;i++) {
                if (typeof finalOutput[parse[i].Author] === 'undefined') {
                    finalOutput[parse[i].Author] = [];
                  }
                  finalOutput[parse[i].Author].push({
                    author: parse[i].Author,
                    id: parse[i].id,
                    name: parse[i].Name,
                    rating:JSON.parse(values[i]).ratingß
                  });
            }
            console.log(finalOutput);
            reply({data:finalOutput,statusCode:200});  
        } ) ;
    });
}
}