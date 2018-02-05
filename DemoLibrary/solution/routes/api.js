var https = require('https');

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
    path: '/getAllBooksFromAPI1',
    method: 'GET',

    handler:function(request,reply) {
        let resultRating = []
        let callback2 = (data)=>{
            let data1 = JSON.parse(data)
            resultRating.push(data1.rating)
            //console.log(resultRating);
        }
        let callback1 = (data) => {
            let parsedData = JSON.parse(data[0]).books;
            let resultID =[]
            for(let i=0;i<parsedData.length;i++) {
                resultID.push(parsedData[i].id);
            }
            for(var i=0;i<resultID.length;i++){
            accessHTTPAsync('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/'+resultID[i],callback2)
            }
            let resultRating = [ 4.38, 4.1, 3.9, 4.45, 4.47, 3.93, 4.54, 4.02, 4.54, 4.53, 4.62, 3.92 ]
            let finalData = []
            for(let i=0;i<parsedData.length;i++) {
                resultID.push(parsedData[i].id);
            }
            reply({
               data:data,
               statusCode:200
           })
          };
       accessHTTPAsync('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks',callback1);
    }
}