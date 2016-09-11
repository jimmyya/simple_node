/**
 * Created by CHEN on 2016/9/11.
 */
var http=require('http');
var server=http.createServer(function (req,res) {
    switch (req.method) {
        case 'GET':
            show(req,res);
            break;
        case 'POST':
            upload(req,res);
            break;
    }
});
var fs=require('fs');
function show(req,res) {
    var html=fs.readFileSync('file_upload.html','utf-8');
    console.log(html);
    res.setHeader('Content-Type','text/html;charset="utf-8"');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
}



var formidable=require('formidable');
function isFormData(req) {
    var type=req.headers['content-type']||'';
    return 0==type.indexOf('multipart/form-data');
}
function upload(req,res) {
    if(!isFormData(req)) {
        res.statusCode=400;
        res.end('Bad Request');
        return ;
    }
}

server.listen(3000);