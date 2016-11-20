/**
 * Created by CHEN on 2016/11/20.
 */
var fs=require('fs');

/**
 * 调用createReadStream 读缓存
 * 调用createWriteStream 写缓存
 * @param src 资源文件
 * @param dst
 */
function copy(src,dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}
function main() {
    copy('C:\\Users\\CHEN\\Desktop\\我的作业\\数据库\\20161120\\3114006500.docx','C:\\Users\\CHEN\\Desktop\\我的作业\\数据库\\20161120\\1.docx');
}
main();