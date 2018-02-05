module.exports = {
    path: '/{name}',
    method: 'GET',
    handler:function(request,reply) {
        reply('Hello '+request.params.name)    
    }
}