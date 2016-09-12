/**
 * Created by CHEN on 2016/9/12.
 */
var redis=require('redis');
var client=redis.createClient(6379,'192.168.114.129');
client.on('error',function (err) {
    console.log('Error: '+err);
});

/********************字符串************************/
// client.set('color','red',redis.print);
// client.get('color',function (err,value) {
//     if(err) throw err;
//     console.log('Got: '+value);
// });


/********************哈希表************************/
// /**
//  * 设置哈希表元素
//  */
// client.hmset('camping',{
//     'shelter':'2-person test',
//     'cooking':'campstove'
// },redis.print);
//
// /**
//  * 获得cooking的值
//  */
// client.hget('camping','cooking',function (err,value) {
//     if(err) throw err;
//     console.log('Will be cooking with :'+value);
// });
// /**
//  * 获得所有的哈希键
//  */
// client.hkeys('camping',function (err,keys) {
//     if(err) throw err;
//     keys.forEach(function(key,i){
//         console.log(' '+key);
//     });
// });


/********************队列************************/
// client.lpush('tasks','Paint the bikeshed red.',redis.print);
// client.lpush('tasks','Paint the bikeshed green.',redis.print);
// client.lrange('tasks',0,-1,function (err,items) {
//     if(err) throw err;
//     items.forEach(function (item,i) {
//         console.log(' '+item);
//     });
// });

/********************集合************************/
client .sadd('ip_addresses','127.0.0.1',redis.print);
client .sadd('ip_addresses','127.0.0.1',redis.print);
client .sadd('ip_addresses','127.0.0.1',redis.print);
client.smembers('ip_addresses',function (err,members) {
    if(err) throw err;
    console.log(members);
})