/**
 * Created by CHEN on 2016/9/12.
 * 使用文件存储的方式存参数
 */

var fs=require('fs');
var path=require('path');
var args=process.argv.splice(2);//去掉参数
var command=args.shift();//取出1第一个参数
var taskDescription=args.join(' ');//合并其余的参数
var file=path.join(process.cwd(),'./tasks');//当前工作目录解析数据库的相对路径

switch (command) {
    case 'list':
        listTasks(file);
        break;
    case 'add':
        addTask(file,taskDescription);
        break;
    default:
        console.log('Usage:'+ process.argv[0]
        +'list| add [taskDescription]');
}


function loadOrInitializeTaskArray(file,cb) {
    fs.exists(file, function (exists) {//检查.tasks文件是否已经存在
        var tasks = [];
        if (exists) {
            fs.readFile(file, 'utf8', function (err, data) {//从.tasks文件读取待执行事项数据
                if (err) throw err;
                var data = data.toString();
                var tasks = JSON.parse(data || '[]');//json编码数据解析到任务数组中
                cb(tasks);
            });
        } else {
            cb([]);//.task文件不存在，创建空的任务数组
        }
    });
}
function listTasks(file) {
    loadOrInitializeTaskArray(file,function (tasks) {
        for(var i in tasks) {
            console.log(tasks[i]);
        }
    });
}

function storeTasks(file,tasks) {
    fs.writeFile(file,JSON.stringify(tasks),'utf8',function (err) {
        if(err) throw err;
        console.log('Save.');
    })
}

function addTask(file,taskDescription) {
    loadOrInitializeTaskArray(file,function (tasks) {
        tasks.push(taskDescription);
        storeTasks(file,tasks);
    })
}
