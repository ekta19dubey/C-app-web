

console.log("server.js called");
const express = require('express');
const fs = require("fs")
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

//const RouterContainer = require('./Routers/device.router');
const RouterContainer1 = require('./Routers/user.route');
const app = express();
const hostname = '0.0.0.0';
const port = 3011;

app.use(express.static('build'));

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH");
    next();
});
app.use(
    cors({
        origin: "*", // restrict calls to those this address
        methods: "POST" // only allow GET requests
    })
);

app.use(bodyParser.json());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
// // for parsing application/json
// app.get('', (req, res) => {

//     res.send("Hello Express!");

// });

//app.use(RouterContainer);
console.log(__dirname)
app.use(RouterContainer1);
///Users/ekta/Desktop/ProjecFolder/C-app-web
// app.use(express.static(path.join(__dirname, 'build')));  // Handle React routing, return all requests to React app



app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res) => {
//     res.sendFile('./index.html', { root: __dirname });
// });
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))

});


// server.configure(function(){
//     server.use('/media', express.static(__dirname + '/media'));
//     server.use(express.static(__dirname + '/public'));
//   });


// http.createServer((req, res) => {
//     console.log("qqqqq")
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello Ekta');
// });

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});


