/**
 * Created by CHEN on 2016/9/11.
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