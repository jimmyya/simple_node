/**
 * Created by CHEN on 2016/9/12.
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
    var html=fs.readFileSync('file_upload.html','utf-8');//同步的方式读取
    //console.log(html);
    res.setHeader('Content-Type','text/html;charset="utf-8"');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
}



var formidable=require('formidable');
function isFormData(req) {
    //检查是否以multipart/form-data开头
    var type=req.headers['content-type']||'';
    return 0==type.indexOf('multipart/form-data');
}
function upload(req,res) {
    if(!isFormData(req)) {
        res.statusCode=400;
        res.end('Bad Request');
        return ;
    }
    var form=new formidable.IncomingForm();
    form.on('progress',function (bytesReceived,bytesExpected) {
        var percent=Math.floor(bytesReceived/bytesExpected*100);
        console.log(percent);
    })

    form.parse(req,function (err,fields,files) {
        console.log(fields);
        console.log(files);
        res.end('upload complete');
    });

}

server.listen(3000);