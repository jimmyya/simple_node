/**
 * Created by CHEN on 2016/9/11.
 * 相比起http3.js 多了一个错误捕捉 防止 访问路径不存在报错
 */
var http=require('http')
var parse =require('url').parse;
var join=require('path').join;
var fs=require('fs');

var root =__dirname;

var server=http.createServer(function (req,res) {//request、response
    var url=parse(req.url);
    var path=join(root,url.path);
    var stream=fs.createReadStream(path);//创建文件通道
    stream.pipe(res);//stream通道传输给response
    //在Node中，所有继承EventEmitter的类都可能发生error事件，
    //为了防止服务器被搞垮，我们要监听错误
    //http://localhost:3000/hello.html
    stream.on('error',function (err) {
        res.statusCode=500;
        res.end('Inrernal server error');
    })
})


server.listen(3000);