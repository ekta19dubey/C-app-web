

console.log("server.js called");
const express = require('express');

const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const RouterContainer = require('./Routers/device.router');
const RouterContainer1 = require('./Routers/user.route');
const app = express();
//const hostname = '127.0.0.1';
const port = 3010;
app.use(cors());
//app.use(bodyParser.json({ limit: "500mb" }));
//app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
// // for parsing application/json

// //for parsing application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

app.use(RouterContainer);
app.use(RouterContainer1);

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});


// console.log("server file")
// const http = require("http");
// const bodyParser = require('body-parser');
// const express = require("express");
// const cors = require('cors');


// const RouterContainer = require('./Routers/user.route');

// const app = express()

// app.use(cors());
// app.use(bodyParser.json());
// // for parsing application/json
// app.use(express.json());
// // for parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// app.use(RouterContainer);

// //CREATE SERVER
// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end(JSON.stringify(data));
// })

// app.listen(1212, () => {
//     console.log("server start at 1212")
// });


