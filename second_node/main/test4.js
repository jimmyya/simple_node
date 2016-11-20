var net=require('net');
net.createServer(function (conn) {
    conn.on('data',function (data) {
        conn.write([
            'http/1.1 200 ok',
            'Content-Type:text/plain',
            'Content-Length:11',
            '',
            'Hello world'
        ].join('\n'));
    });
}).listen(80);