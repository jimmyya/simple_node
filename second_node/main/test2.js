/**
 * Created by CHEN on 2016/11/20.
 */
var http=require('http');

var server=http.createServer(function (request,response) {
    var body=[];
    console.log(request.method);
    console.log(request.headers);
    
    request.on('data',function (chunk) {//chunk 块
        body.push(chunk);
    })

    request.on('end',function () {
        body=Buffer.concat(body);
        console.log(body.toString());
    })
    
}).listen(3000);