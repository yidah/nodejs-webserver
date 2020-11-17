const express = require('express');
const bodyParser = require('body-parser');

// Set up Express 
const app = express();

app.set('view engine', 'ejs'); // tell expresss the engine for packing our view is ejs
app.set('views', 'views') // tell express where our views are


// in the server we get an extra funtionallity, middleware with the next argument
// we can divide our server call into different chunks

app.use(bodyParser.urlencoded({extended:false})); // parsing the body is easier with body-parser package than with pure node.js

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
});

// this middleware will be executed once next(); is called 
app.use((req, res, next)=>{
    const username = req.body.username || 'Unkown user';
    // without ejs
    // res.send(`<h1>Hola user ${username}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`);
    
    // using ejs
    res.render('index', {
        user:username

    });
});

app.listen(3000);
