/*
  express 3.xでどのmethodが有効か
  ここに一覧がある https://github.com/jshttp/methods/blob/master/index.js#L13
  expressのこの部分でここの一覧のmethodとapp.hogeを対応づけてる
  https://github.com/strongloop/express/blob/3.17.0/lib/application.js#L423

  getでもnextでとばせる
 */

var express = require("express");
    app = express();

app.get("/", function(req, res, next){
  console.log("fuga");
  next();
});

app.get("/", function(req, res){
  res.end("huga");
});

var server = app.listen(8888, function(){
  console.log("server start")
});
