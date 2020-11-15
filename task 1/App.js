const http = require('http');
const fs = require('fs');

var server = http.createServer((request, response)=>{
	//console.log(request.url);
	//console.log(request.method);

	/*response.write('<h1>Hello from node Http server...</h1>');
	response.end()*/

	if(request.url == '/home'){
		fs.createReadStream('Home.html').pipe(response);
	}else if(request.url == '/about'){

		
		fs.createReadStream('About.html').pipe(response);

	}else if(request.url == '/about'){
		fs.createReadStream('Contact.html').pipe(response);
	}
	else{
		response.write('<h3>404 invalid request</h3>');
		response.end()
	}
});

server.listen(3000);
console.log('server started at 3000...');