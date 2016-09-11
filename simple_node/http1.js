/**
 * Created by CHEN on 2016/9/11.
 */
var http=require('http')
//Node服务器是长期运行的进程
//创建一个服务
var server =http.createServer(function (req,res) {
    //将响应数据写到socket中
    var body='Hello world';
    res.setHeader('Content-Length',body.length);
    res.setHeader('Content-Type','text/plain');
    //响应头的顺序可以随意，但是一定要在调用res.write()或res.end()之前
    res.end(body);
})
//加上监听端口
server.listen(3000);