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
  arr = _.range _.random 10, 50
  async.eachLimit arr, _.random(3, 10), (number, cbf) ->
    request.get 'http://www.baidu.com/', (err, res, body) ->
      cbf null
  , (err) ->
    interval = _.random 2000
    setTimeout ->
      download()
    , interval

writeFile = ->
  file = '/Users/tree/tmp/simulation.test'
  options =
    flags : 'a+'
  writeStream = fs.createWriteStream file, options
  writeBuf = ->
    buf = new Buffer _.random 1024 * 1024
    writeStream.write buf
    setTimeout ->
      writeBuf()
    , _.random 10
  writeBuf()

run = ->
  calculate()
  writeFile()
  # download()

if process.env.NODE_ENV == 'production'
  new JTCluster {
    slaveHandler : run
  }
else
  run()