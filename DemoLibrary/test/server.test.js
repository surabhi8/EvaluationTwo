const server = require(__dirname+'/../solution/server.js')
describe('Testing the Hapi server that processes the requests',()=>{
    test('Should return 200 status code for successful get request',(done)=>{
        const options = {
            method:'GET',
            url : '/getAllBooks'
        }
        server.inject(options,(response)=>{
            expect(response.statusCode).toBe(200);
            done();
        })
       
    })
    test('Should return correct response successful get request',(done)=>{
        const options = {
            method:'GET',
            url : '/getAllBooks'
        }
        server.inject(options,(response)=>{
            expect(response.data).toBe(200);
            done();
        })
       
    })
    })