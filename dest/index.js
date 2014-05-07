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
    arr = _.range(_.random(10, 50));
    return async.eachLimit(arr, _.random(3, 10), function(number, cbf) {
      return request.get('http://www.baidu.com/', function(err, res, body) {
        return cbf(null);
      });
    }, function(err) {
      var interval;
      interval = _.random(2000);
      return setTimeout(function() {
        return download();
      }, interval);
    });
  };

  writeFile = function() {
    var file, options, writeBuf, writeStream;
    file = '/mnt/simulation.test';
    options = {
      flags: 'w'
    };
    writeStream = fs.createWriteStream(file, options);
    writeBuf = function() {
      var buf;
      buf = new Buffer(_.random(256 * 1024));
      return writeStream.write(buf, function() {
        return setTimeout(function() {
          return writeBuf();
        }, _.random(10));
      });
    };
    return writeBuf();
  };

  run = function() {
    calculate();
    return writeFile();
  };

  if (process.env.NODE_ENV === 'production') {
    new JTCluster({
      slaveHandler: run
    });
  } else {
    run();
  }

}).call(this);
