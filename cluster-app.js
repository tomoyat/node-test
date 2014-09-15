var cluster = require("cluster"),
    express = require("express");
    numCpus = require("os").cpus.length;

if (cluster.isMaster) {
  for (var i = 0; i < 2; i++) {
    cluster.fork();
  }

  cluster.on("exit", function(worker, code, signal){
    console.log("worker " + worker.process.pid + " is died");
  });
} else if(cluster.isWorker) {
  var app = express();
  app.get("/", function(req, res){
    console.log(cluster.worker.id + " server access!");
    res.end("worker " + cluster.worker.id);
  });

  var server = app.listen(8888, function() {
    console.log("server start at worker " + cluster.worker.id);
  });
}
