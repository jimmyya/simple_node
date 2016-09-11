/**
 * Created by CHEN on 2016/9/11.
 */
var http=require('http');
var url=require('url');
var items=[];

var server=http.createServer(function (req,res) {
    console.log(req.method)
    switch(req.method) {
        //curl -d 'haha' http://localhost:3000
        case 'POST':
            var item='';
            req.setEncoding('utf8');//设置数据块不是buffer而是utf8字符串
            req.on('data',function (chunk) {//只要读入新的数据块，就触发data事件
                item+=chunk;
                console.log(item)
                //console.log('parsed',chunk);//数据块默认是个buffer对象（字节数组）
            })
            req.on('end',function () {//数据全部读完
                items.push(item);
                //console.log('done parsing');
                res.end('OK\n');
            });
            break;
        //curl http://localhost:3000
        case 'GET':
            // items.forEach(function (item,i) {
            //     res.write(i+') '+item+'\n');
            // });
            //设定 Content-Length 域会隐含禁用Node的块编码，因为要传输的数据更少，所以能提升性能
            var body=items.map(function (item,i)  {
               return i+')'+item;
            }).join('\n');
            res.setHeader('Content-Length',Buffer.byteLength(body));
            res.setHeader('Content-Type','text/plain;charset="utf-8"');
            res.end(body);
            break;
        /**
         *
         > require('url').parse('http://localhost:3000/1?api-key=foobar')
         Url {
              protocol: 'http:',
              slashes: true,
              auth: null,
              host: 'localhost:3000',
              port: '3000',
              hostname: 'localhost',
              hash: null,
              search: '?api-key=foobar',
              query: 'api-key=foobar',
              pathname: '/1',
              path: '/1?api-key=foobar',
              href: 'http://localhost:3000/1?api-key=foobar'
              }
         >
         */

        //curl -X DELETE http://localhost:3000/0
        case 'DELETE':
            var path=url.parse(req.url).pathname;
            console.log(path);
            var i=parseInt(path.slice(1),10);//从第二位开始 十进制
            console.log(i);
            if(isNaN(i)) {
                res.statusCode=400;
                res.end('Invalid item id');
            } else if (!items[i]){
                res.statusCode=404;
                res.end('item not found');
            } else {
                items.splice(i,1);
                res.end('OK\n');
            }
            break;
    }

});

server.listen(3000);