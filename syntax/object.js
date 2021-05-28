var members = ['jaeylee', 'ejei0', 'j2']

var i = 0;
while(i < members.length) {
	console.log('array roop ' + members[i]);
	i++;
}

var roles = {
		'programer' : 'jaeylee',
		'designer' : '2j',
		'manager' : 'asdf'
}
console.log(roles.designer);

for (var name in roles) {
		//console.log('key=', name, 'value=', roles.name);
		console.log('key=', name, 'value=', roles[name]);
}
