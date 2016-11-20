/**
 * Created by CHEN on 2016/11/20.
 */
var fs=require('fs');

/**
 *调用writeFileSync函数 写文件
 * 调用readFileSync函数 读文件
 * @param src
 * @param dst
 */
function copy(src,dst) {
    fs.writeFileSync(dst,fs.readFileSync(src));
}

function main(){
    copy('C:\\Users\\CHEN\\Desktop\\我的作业\\数据库\\20161120\\3114006500.docx','C:\\Users\\CHEN\\Desktop\\我的作业\\数据库\\20161120\\1.docx');
}
main();