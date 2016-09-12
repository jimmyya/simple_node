/**
 * Created by CHEN on 2016/9/12.
 */
var redis =require('redis');
var net=require('net');
var server=net.createServer(function (socket) {//
    var subscriber;
    var publisher;
    socket.on('connect',function () {
        subscriber=redis.createClient();//为用户创建预定客户端
        subscriber.subscribe('main_chat_room');//预定信道

        subscriber.on('message',function (channel,message) {
            socket.write('Channel '+channel+':' +message);
        });
        publisher=redis.createClient();//创建用户客户端
    });

    socket.on('data',function (data) {
        publisher.publish('main_chat_room',data);//发布用户信息
    });

    socket.on('end',function () {
        subscriber.unsubscribe('main_chat_room');
        subscriber.end();
        publisher.end();
    })
});
server.listen(3000)
