var fs = require('fs');

//익명함수

/*
function a() {
	console.log('A');

}
*/

var a = function () {
	console.log('A');

} //js 에서는 함수는 값이다.

function slowfunc(callback) {
	console.log('a');

	callback();
	console.log('c');

slowfunc(a);
