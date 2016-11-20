/**
 * Created by CHEN on 2016/11/20.
 */
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
//dup[0] = 0x48;
console.log(bin.toString('utf-8')); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>