var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control) {
	return (`
				<!doctype html>
				<html>
				<head>
					<title>WEB1 - ${title}</title>
					<meta charset="utf-8">
				</head>
				<body>
					<h1><a href="/">WEB</a></h1>
					${list}
					${control}
					${body}
				</body>
				</html>
				`);
}

function templateList(filelist) {
	var list = '<ul>';
	var i = 0;
	while (i < filelist.length) {
		list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
		i++;
	}
	list = list + '</ul>';
	return list;
}

//createServer 에 전달된 콜백함 = 노제이에스로 웹부라우저가 접속이 들어올때마다 콜백함수를 호출하고 인자2개를 줌. 요청할 때 보낸정보 응답할때 전송할 전보들.ㅓㅓㅓㅓ
var app = http.createServer(function(request,response){
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;

	//console.log(pathname);
	//console.log( url.parse(_url, true));

	if (pathname === '/') {
		if (queryData.id === undefined) {

			fs.readdir('./data', function(error, filelist) {
//				console.log(filelist);

				var title = 'Welcome home';
				var description = 'hello, node.js';
				var list = templateList(filelist);
				var template = templateHTML(title, list, 
					`<h2>${title}</h2>${description}`,
					`<a href="/create">create</a>`
				);
				response.writeHead(200);//webserver 응답 잘 됐는지 성공
				response.end(template);
			});

		} else {
			fs.readdir('./data', function(error, filelist) {
				console.log(filelist);

				fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){

								var list = templateList(filelist);
								var title = queryData.id;
					var template = templateHTML(title, list, `<h2>${title}</h2>${description}`, 
					`<a href="/create">create</a> 
					<a href="/update?id=${title}">update</a>
					<form action="delete_process" method="post">
						<input type="hidden" name="id" value="${title}">
						<input type="submit" value="delete">
					</form>

					`
					//delete 는 link으로하면안됨 form 추천
					//<a href="/delete?id=${title}">delete</a>

					);
					response.writeHead(200);//webserver 응답 잘 됐는지 성공
					response.end(template);
				});
			});

		}

	} else if (pathname === '/create') {
			fs.readdir('./data', function(error, filelist) {
//				console.log(filelist);
				var title = 'WEB - create ';
				//var description = 'hello, node.js';
				var list = templateList(filelist);
				var template = templateHTML(title, list,`
<form action="/create_process" method="post">
	<p><input type="text" name="title" placeholder="title"></p>
	<p>
		<textarea name="description" placeholder='description'></textarea>
	</p>
	<p>
		<input type="submit">
	</p>
</form>
				`,
				''
				);
				response.writeHead(200);//webserver 응답 잘 됐는지 성공
				response.end(template);
			});

	} else if (pathname === '/create_process') {
		//TODO: POST METHOD 로 전달된 데이터를 노드제이에스에서는 어떻게 가져오는가!!

		var body = '';
		//Post 방식으로 전송된 데이터를 가져올수있다. 객체화 할 수 있다.
		//dnpqqd웹부라우저가 포스트방식으로 데이터를 전송할 때 데이터가 엄청많으면 한번에 처리하려고 하면 컴퓨터에 무리가 올수 있기 대문에, 노드제이에스에서는 전송될 데이터가 많을 경우를 대비해서 아래와 같은 방식을 제안, 100이 있으면 조각조각의 양들을 수신할 때마다(서버쪽에서) 콜백함수를 호출하도록 약속되있고 데이터 인자를 통해서 주기로 약속되어있따.
		request.on('data', function(data) {
			body = body + data; //body data에다가 콜백함수가 실행될때마다 데이터를 추가해줌.

		});
		// 더이상 들어올 정ㅈ보가 ㅇ벗으면 end다음의 호출할 함수를 전달하도록 약속되있음.
		request.on('end', function() {
			//정보수신이 끝났다.
			var post = qs.parse(body); //지금까지 저장한 바디를 입력값으로 주면.
			var title = post.title;
			var description = post.description;

			//console.log(post);
			//console.log(post.title);
			//console.log(post.description);

			fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
				response.writeHead(302, {Location: `/?id=${title}`});//webserver redirect 응답 잘 됐는지 성공
				response.end('success');

			});
		});

	} else if(pathname === '/update') {

			fs.readdir('./data', function(error, filelist) {
				console.log(filelist);

				fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){

					var list = templateList(filelist);
					var title = queryData.id;
					var template = templateHTML(title, list,
									`
<form action="/update_process" method="post">
	<input type="hidden" name="id" value="${title}">
	<p><input type="text" name="title" placeholder='title' value="${title}"></p>
	<p>
		<textarea name="description" placeholder='description'>${description}</textarea>
	</p>
	<p>
		<input type="submit">
	</p>
</form>
									`,

					`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`

					);
					response.writeHead(200);//webserver 응답 잘 됐는지 성공
					response.end(template);
				});
			});
	} else if(pathname === '/update_process') {
		var body = '';
		request.on('data', function(data) {
			body = body + data; //body data에다가 콜백함수가 실행될때마다 데이터를 추가해줌.

		});
		request.on('end', function() {
			var post = qs.parse(body); //지금까지 저장한 바디를 입력값으로 주면.
			var id = post.id;
			var title = post.title;
			var description = post.description;

			console.log(post);
			//nodejs file rename
			fs.rename(`data/${id}`, `data/${title}`, function(err){
							fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
								response.writeHead(302, {Location: `/?id=${title}`});//webserver redirect 응답 잘 됐는지 성공
								response.end();
							});

			});

		});
	} else if(pathname === '/delete_process') {
					//nodejs delete file | fs.unlink
		var body = '';
		request.on('data', function(data) {
			body = body + data; //body data에다가 콜백함수가 실행될때마다 데이터를 추가해줌.

		});
		request.on('end', function() {
			var post = qs.parse(body); //지금까지 저장한 바디를 입력값으로 주면.
			var id = post.id;
			fs.unlink(`data/${id}`, function(err){
								response.writeHead(302, {Location: `/`});//webserver redirect 응답 잘 됐는지 성공
								response.end();

											});

		});
	} else {
		response.writeHead(404);//webserver 응답 잘 됐는지 성공
		response.end('not found');
	}
});
app.listen(3000);

/* post request. 
function (request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			// 용량이 너무크면 접속을 끊어버리는 보안장치.
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
        });
    }
}
*/
