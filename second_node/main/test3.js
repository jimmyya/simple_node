/**
 * Created by CHEN on 2016/11/20.
 */
var options={
    hostname:'www.baidu.com',
    port:80,
    path:'/upload',
    method:'post',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }
};
var request=http.request(options,function(response){});
request.write('hello world');
request.end();