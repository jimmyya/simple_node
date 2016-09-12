/**
 * Created by CHEN on 2016/9/12.
 */
var http=require('http');
var work=require('./timetrack');
var mysql=require('mysql');

var db=mysql.createConnection({//连接mysql数据库
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database:'timetrack'
});

var server =http.createServer(function (req,res) {
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/':
                    work.add(db,req,res);
                    break;
                case '/archive':
                    work.archive(db,req,res);
                    break;
                case '/delete':
                    work.delete(db,req,res);
                    break;
            }
            break;
        case 'GET':
            switch (req.url) {
                case '/':
                    work.show(db,res);
                    break;
                case '/archived':
                    work.showArchived(db,res);
                    break;
            }
            break;
        default: break;
    }
});
db.query(
    'create table if not exists work (' +//创建SQL
    'id int(10) not null auto_increment,' +
    'hours decimal(5,2) default 0,' +
    'date DATE,' +
    'archived int(1) default 0,' +
    'description longtext,' +
    'primary key(id) ' +
    ')',
        function (err) {
            if(err) throw err;
            console.log('server started..');
            server.listen(3000,'127.0.0.1');//启动http服务器
        }
);