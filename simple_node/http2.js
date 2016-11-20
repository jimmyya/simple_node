/**
 * Created by CHEN on 2016/9/11.
 *
 * 301 代表暂时性转移 将老地址的pagerank等信息带到新地址
 * 302 代表永久性转移
 *
 */
var http=require('http')

var server=http.createServer(function (req,res) {
    var url='http://google.com';
    var body='<p>跳转至<a href="'+url+'">' +
        url+'</a></p>';
    res.setHeader('Location',url);
    res.setHeader('Content-Length',body.length);
    res.setHeader('ContentType','text/html');
    res.statusCode=302;
    res.end(body);

});
server.listen(3000)