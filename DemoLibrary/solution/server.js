const Hapi =  require('hapi')
const server = new  Hapi.Server
server.connection({
    host: 'localhost',
    port: 8080,
  });

if(!module.parent){
    server.start ( (err) => {
        if(err){
            throw err;
        } 
        console.log("Server started")
    }
)
}
module.exports = server