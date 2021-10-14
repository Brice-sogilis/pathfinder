var http = require('http')
var express = require('express')
var app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.write("Hi there");
    res.end()
});

http.createServer(app).listen(8888);