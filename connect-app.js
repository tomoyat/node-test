/*
  connectを試したときのlog
  connectにはapp.getがないっぽい
 */

var connect = require("connect"),
    http = require("http");

var app = connect();

app.use(function(req, res, next){
  console.log("func1");
  next();
});

app.use(function(req, res, next) {
  console.log("func2");
  next();
});

/*
app.get('/hoge', function(req, res, next) {
  res.end("hello2");
});
*/
app.use(function(req, res, next){
  res.end("hello");
});

http.createServer(app).listen(8888);
