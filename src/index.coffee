JTCluster = require 'jtcluster'
_ = require 'underscore'
request = require 'request'
async = require 'async'
fs = require 'fs'

calculate = ->
  max = 30 * 1000 * 1000
  while max--
    i = 0
  interval = _.random 200
  setTimeout ->
    calculate()
  , interval


download = ->
  arr = _.range _.random 1, 10
  async.eachLimit arr, _.random(3, 10), (number, cbf) ->
    request.get 'http://www.baidu.com/', (err, res, body) ->
      cbf null
  , (err) ->
    interval = _.random 10000
    setTimeout ->
      download()
    , interval

writeFile = ->
  file = "/mnt/#{_.random(1000)}.test"
  # file = '/Users/tree/tmp/simulation.test'
  buf = new Buffer _.random 256 * 1024

  diskTest = ->
    async.waterfall [
      (cbf) ->
        fs.writeFile file, buf, cbf
      (cbf) ->
        fs.readFile file, cbf
    ], ->
      setTimeout diskTest, _.random 50


  diskTest()

run = ->
  calculate()
  writeFile()
  download()

if process.env.NODE_ENV == 'production'
  new JTCluster {
    slaveHandler : run
    slaveTotal : 4
  }
else
  run()