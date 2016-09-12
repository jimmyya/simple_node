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
    form.parse(req);//解析data

    form.on('field',function (field,value) {
        console.log(field);
        console.log(value);
    });
    form.on('file',function (name,file) {
        console.log(name);
        console.log(file);
    });
    form.on('end',function () {
        res.end('upload complete');
    });
    form.parse(req);

}

server.listen(3000);