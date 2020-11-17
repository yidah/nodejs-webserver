const http = require('http');

const server = http.createServer((request, response) => {
  let body = [];
  // Adding an event handler in node.js on the 'data' event to process data
  request.on('data', (chunk)=>{
    // we add every pieace on the request into an array
    body.push(chunk);

  });

  // Adding an event handler in node on the 'end' (when we are done receiving data )
  request.on('end', ()=> {
    // we need to convert the data chunks into human readable data
    body = Buffer.concat(body).toString();
    console.log(body);
    
    let username = 'unknown user';
    if(body){
      username = body.split('=')[1];
    }
    response.setHeader('Content-Type', 'text/html');
    response.write(`<h1>Hola user ${username}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`);
    response.end();
    
  })
  // visualize HTTP method GET, POST etc and URL to which is sent
  console.log(request.method, request.url);



});

server.listen(3000);