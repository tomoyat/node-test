var cluster = require("cluster"),
    express = require("express"),
    _ = require("underscore"),
    numCpus = require("os").cpus.length;

function createWorkers(num) {
  var workers = {};
  for (var i = 0; i < num; i++) {
    var w = cluster.fork();
    workers[w.id] = w;
    w.on("disconnect", function(){
      console.log("disconnect : " + w.id);
    });
  }
  return workers;
}

if (cluster.isMaster) {
  var workers = {};
  workers = createWorkers(2);

  process.on("SIGUSR2", function(){
    console.log("Rcv SIGUSR2, Graceful restart");
    var new_workers = createWorkers(2);
    setTimeout(function() {
      console.log("restart!");
      // todo check new worker status;

      _.each(workers, function(w){
        w.disconnect();
      });
      workers = new_workers;
    }, 5000);
  });

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
