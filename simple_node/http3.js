/**
 * Created by CHEN on 2016/9/11.
 */
var http=require('http')
var parse =require('url').parse;
var join=require('path').join;
var fs=require('fs');

var root =__dirname;
// var server=http.createServer(function (req,res) {
//     var url=parse(req.url);
//     var path=join(root,url.pathname);//构造绝对路径
//
//     var stream =fs.createReadStream(path);//创建fs.ReadStream
//     stream.on('data',function (chunk) {//将文件写到响应
//         res.write(chunk);
//     });
//     stream.on('end',function () {
//         res.end();
//     })
// });
//脆弱的服务器 只要请求不存在的文件就会崩坏
var server=http.createServer(function (req,res) {
    var url=parse(req.url);
    var path=join(root,url.path);
    var stream=fs.createReadStream(path);
    stream.pipe(res);
})


server.listen(3000);