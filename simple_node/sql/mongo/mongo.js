/**
 * Created by CHEN on 2016/9/12.
 */
var mongodb=require('mongodb');
var server=new mongodb.Server('192.168.114.129',27017);

var client=new mongodb.Db('jimmyya',server,{w:1});

client.open(function (err,client) {
    if(err) throw err;
    client.collection('test_insert',function (err,collection) {
        if(err) throw err;
        console.log('We are now able to perform queries.');
        //插入
        var doc= {
                'title':'I like cake',
                'body':'It is quite good.'
            };
        collection.insert(
           doc,
            {safe:true},
            function (err,documents) {
                if(err) throw err;
                console.log('Document Id is: '+documents[0]);
            }
        );
        // collection.find({"name":"jimmyya"}).toArray(
        //   function (err,results) {
        //       if(err) throw err;
        //       console.log(results);
        //   }
        // );
    });
});

