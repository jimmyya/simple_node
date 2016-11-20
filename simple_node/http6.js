/**
 * Created by CHEN on 2016/9/11.
 */
var http=require('http');
var items=[];
/**
 * 获得请求 并进行分类
 */
var server =http.createServer(function (req,res) {
    if('/'==req.url) {
        switch (req.method) {//req的http method
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req,res);
                break;
            default :
                badRequest(res);
                break;
        }
    }else {
        notFound(res);
    }
})
/**
 * get 方法
 * @param res
 */
function show(res) {
    var html=
        '<!DOCTYPE html>' +
        '<html lang="zh-CN">' +
        '<head>' +
        '<meta charset="UTF-8">' +
        '<title>hello node_web</title>' +
        '<link rel="shortcut icon" href="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png">' +
        '</head>' +
        '<body>' +
        '<h1>Todo List</h1>' +
        '<ul>' +
        items.map(function (item) {
            return '<li>'+item+'</li>';
        }).join('')+
        '</ul>' +
        '<form method="post" action="/">' +
        '<input type="text" name="item"/>' +
        '<input type="submit" value="Add Item"/>'
        +'</body>'
        +'</html>';
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content_Length',Buffer.byteLength(html));
    res.end(html);
}

/**
 * 该资源不存在
 * @param res
 */
function notFound(res) {
    res.statusCode=404;
    res.setHeader('Content-Type','text/plain');
    res.end('Not Found');
}

/**
 *
 * @param res
 */
function badRequest(res) {
    res.statueCode=400;
    res.setHeader('Content-Type','text/html');
    res.end('Bad Request');
}

/**
 * 提交数据
 */
var qs=require('querystring');//请求参数模块
function add(req,res) {
    var body='';
    req.setEncoding('utf-8');
    req.on('data',function (chunk) {
        body+=chunk;//读取数据块
    })
    req.on('end',function () {
        var obj=qs.parse(body);
        items.push(obj.item);
        show(res);//重新显示数据
    })
}

server.listen(3000);