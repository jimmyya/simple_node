/**
 * Created by CHEN on 2016/9/11.
 */
var http=require('http')
//Node服务器是长期运行的进程
//创建一个服务
var server =http.createServer(function (req,res) {
    //将响应数据写到socket中
    res.write('<h1>Hello World</h1>');
    res.end();
})
//加上监听端口
server.listen(3000);
