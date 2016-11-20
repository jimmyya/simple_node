/**
 * Created by CHEN on 2016/9/11.
 * 细化error
 */
var http=require('http')
var parse =require('url').parse;
var join=require('path').join;
var fs=require('fs');

var root =__dirname;

var server=http.createServer(function (req,res) {
    var url=parse(req.url);
    var path=join(root,url.path);
    fs.stat(path,function (err,stat) {
        if(err) {
            console.log(err.code)
            if('ENOENT'==err.code) {
                res.statusCode=404;
                res.end('Not Found');
            } else {
                res.statusCode=500;
                res.end('Internal Server Error');
            }
        } else {
            var stream=fs.createReadStream(path);
            stream.pipe(res);
            //在Node中，所有继承EventEmitter的类都可能发生error事件，
            //为了防止服务器被搞垮，我们要监听错误
            stream.on('error',function (err) {
                res.statusCode=500;
                res.end('Inrernal server error');
            });
        }
    });
});
server.listen(3000);