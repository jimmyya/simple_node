/**
 * Created by CHEN on 2016/9/10.
 */
var https=require('https')
var fs=require('fs')

var options={
    key:fs.readFileSync('ssh_key.pen'),
    cert:fs.readFileSync('ssh_cert.pen')

}

https
    .createServer(options,function (req,res) {
        res.writeHead(200)
        res.end('hello imooc')
    })
    .listen(8090)