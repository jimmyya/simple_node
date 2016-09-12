/**
 * Created by CHEN on 2016/9/12.
 */
var mysql=require('mysql');

var db=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'timetrack'
});

db.query(
    'insert into work(hours,date,archived,description)' +
    ' values("2","2001-01-01",1,"没有")',
    [],
    function (err) {
        console.log('插入');
        if(err) throw err;
    }
);

db.close;