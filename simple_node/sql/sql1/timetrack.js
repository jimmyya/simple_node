/**
 * Created by CHEN on 2016/9/12.
 */
var qs=require('querystring');

/**
 * 发送html响应
 * @param res
 * @param html
 */
exports.sendHtml=function (res,html) {
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
};

/**
 * 解析http post数据
 * @param req
 * @param cb
 */
exports.parseReceivedData=function (req,cb) {
    var body='';
    req.setEncoding('utf8');
    req.on('data',function (chunk) {
        body+=chunk;
    });
    req.on('end',function () {
        var data=qs.parse(body);
        cb(data);
    })
};

/**
 * 渲染简单表单
 * @param id
 * @param path
 * @param label
 */
exports.actionForm=function (id,path,label) {
    var html=
        '<form method="post" action="' +
        path +
        '">' +
        '<input type="hidden" name="id" value="' +
        id +
        '"/>' +
        '<input type="submit" value="' +
        label +
        '"/>' +
        '</form>';
    return html;
}

/**
 * 数据添加
 * @param db
 * @param req
 * @param res
 */
exports.add=function(db,req,res) {
    exports.parseReceivedData(req,function (work) {
        db.query(
            "insert into work(hours,date,description)" +
            "values(?,?,?)",
            [work.hours,work.date,work.description],
            function (err) {
                if(err) throw err;
                exports.show(db,res);//给用户显示工作清单
            }
        );
    });
}

/**
 * 数据删除
 * @param db
 * @param req
 * @param res
 */
exports.delete=function (db,req,res) {
    exports.parseReceivedData(req,function (work) {
        db.query(
            'delete from work where id=?',
            [work.id],
            function (err) {
                if(err) throw err;
                exports.show(db,res);
            }
        );
    });
};

/**
 * 更新数据
 * @param db
 * @param req
 * @param res
 */
exports.archive=function (db,req,res) {
    exports.parseReceivedData(req,function (work) {
        db.query(
            'update work set archived =1 where id=?',
            [work.id],
            function (err) {
                if(err) throw err;
                exports.show(db,res);
            }

        );
    });
};

exports.show=function (db,res,showArchived) {
    var query='select * from work ' +
        'where archived=? ' +
        'order by date desc';
    var archivedValue=(showArchived)?1:0;
    db.query(
        query,
        [archivedValue],
        function (err,rows) {//错误信息和数据resultset
            if(err) throw err;
            var html=(showArchived)?
                '':
                '<a href="/archived">更新</a></br>';
            html+=exports.workHitlistHtml(rows);
            html+=exports.workFormHtml();
            exports.sendHtml(res,html);
        }
    );
}

/**
 * 显示归档工作记录
 * @param db
 * @param res
 */
exports.showArchived=function (db,res) {
    exports.show(db,res,true);
}

exports.workHitlistHtml=function (rows) {
    var html= '<!DOCTYPE html>'+
    '<html lang="en">'+
    '   <head>'+
    '   <meta charset="UTF-8">'+
    '   <title>timetrck</title>'+
    '   </head>'+
    '   <body><table>';
    for(var i in rows) {
        html+='<tr>' +
            '<td>' +
            rows[i].date +
            '</td>'+
            '<td>' +
            rows[i].hours +
            '</td>'+
            '<td>' +
            rows[i].description +
            '</td>';
        if(!rows[i].archived) {
            html+='<td>'+exports.workArchiveForm(rows[i].id)+'</td>';
        }
        html+='<td>' +
            exports.workDeleteForm(rows[i].id) +
            '</td>' +
            '</tr>';
    }
    html+='</table>';
    return html;
};

/**
 * 渲染页面
 * @returns {string}
 */
exports.workFormHtml=function () {
    var html='<form method="POST" action="/">' +
        '<p>Date(YYYY-MM-DD):</br><input name="date" type="text"/></p>'+
        '<p>Hours worked:</br><input name="hours" type="text"></p>'+
        '<p>Description:</br><textarea name="description"></textarea></p>'+
        '<input type="submit" value="添加"/>' +
        '</form>' +
        '</body>'+
        '</html>';
    return html;
}

exports.workArchiveForm=function (id) {
    return exports.actionForm(id,"/archive",'更新');
}

exports.workDeleteForm=function (id) {
    return exports.actionForm(id,'/delete','删除');
}
