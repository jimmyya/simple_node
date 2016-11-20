/**
 * Created by CHEN on 2016/11/20.
 */
var http=require('http');

var server=http.createServer(function(request,response) {
    response.writeHead(200,{'Content-Type':'text-plain'});
    response.end('hello world');
});

server.listen(3000);
