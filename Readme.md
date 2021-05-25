# NODEJS

#JS - Data type - Number
```
var str = 'hello';
str.length;

'abcdefg ${args}'
```

# 똑같은 파일이지만 값을 다르게 해서 다른 페이지를 만들어서 보냄.

# URL
http://sample.org:3000/main?id=HTML&page=12

- http = 통신규칙 protocol
- host(domain)
- port number
- path
### 동적페이지는 이부분을 건드림..
- query string
	- start = ? 약속
	- 값 &, = 약속.

# CRUD
> nodejs = module

Create 
Read 
Update 
Delete

# nodejs file list in directory
fs.readdir

# sync, async 동기, 비동기
- a -> b -> c
- a -> b,c -> b,c,d,e ... 효율적이지만 매우 복잡
노드js 비동기를 사용하기위한 밥법

filehandling = fs
fs.link
fs.linkSync
fs.lstat

<callback>

# npm
패키지 매니저

# form
contents create only directory owner.
컨텐츠를 사용자가 웹을 통해서 생성하고 삭제하는 방법.
```
사용자가 서버쪽으로 전송.
```
POST 방식으로 전송된 데이터 받기
nodejs post data = How do you extract POST ...
https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js


post data를 받아서 파일에 저장하고, 그 결과 페이지를 리다이렉션 하는 방법.
- nodejs file write.
fs.writeFile(file,data,callback)

# redirection
	- 사용자를 다른 페이지로 팅겨내는것.
	- nodejs redirection
