var fs = require('fs');

/*
//file read Sync 동기적
console.log('A');
var result = fs.readFileSync('sync/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/
// 없으면 비동기적 즉 비동기적을 선호한다. + 콜백매개변수!!
console.log('A');
fs.readFile('sync/sample.txt', 'utf8', function(err, result) {
//3번째 콜백함수 호출되고 안에 있는 코드가 실행됨.
	console.log(result);
}); //node readfile read, 3argu, work, call func
//callback 나중에 전화해, 파일을 다 읽고나서 작업이 끝났으면 함수를 호출해!
console.log('C');
