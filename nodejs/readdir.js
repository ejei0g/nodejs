var testFolder = './data/'
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){

	console.log(filelist);
})

// [ 'a', 'b', 'c', 'd', ... , 'last file in directory ']
