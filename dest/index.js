(function() {
  var JTCluster, async, calculate, download, fs, request, run, writeFile, _;

  JTCluster = require('jtcluster');

  _ = require('underscore');

  request = require('request');

  async = require('async');

  fs = require('fs');

  calculate = function() {
    var i, interval, max;
    max = 30 * 1000 * 1000;
    while (max--) {
      i = 0;
    }
    interval = _.random(200);
    return setTimeout(function() {
      return calculate();
    }, interval);
  };

  download = function() {
    var arr;
    arr = _.range(_.random(1, 10));
    return async.eachLimit(arr, _.random(3, 10), function(number, cbf) {
      return request.get('http://www.baidu.com/', function(err, res, body) {
        return cbf(null);
      });
    }, function(err) {
      var interval;
      interval = _.random(10000);
      return setTimeout(function() {
        return download();
      }, interval);
    });
  };

  writeFile = function() {
    var buf, diskTest, file;
    file = "/mnt/" + (_.random(1000)) + ".test";
    buf = new Buffer(_.random(256 * 1024));
    diskTest = function() {
      return async.waterfall([
        function(cbf) {
          return fs.writeFile(file, buf, cbf);
        }, function(cbf) {
          return fs.readFile(file, cbf);
        }
      ], function() {
        return setTimeout(diskTest, _.random(50));
      });
    };
    return diskTest();
  };

  run = function() {
    calculate();
    writeFile();
    return download();
  };

  if (process.env.NODE_ENV === 'production') {
    new JTCluster({
      slaveHandler: run,
      slaveTotal: 4
    });
  } else {
    run();
  }

}).call(this);
