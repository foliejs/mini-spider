'use strict'

const cluster = require('cluster')
const http = require('http')
const cpu = require('os').cpus().length

/**
 * [if description]
 * @param  {[type]} cluster.isMaster [description]
 * @return {[type]}                  [description]
 */
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < cpu; i++) {
    cluster.fork()
  }

  cluster.on('listening',function(worker,address){
    console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port)
  })

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died')
  })
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200)
    res.end("hello world\n")
  }).listen(0);
}


// cluster.setttings:配置集群参数对象
// cluster.isMaster:判断是不是master节点
// cluster.isWorker:判断是不是worker节点
// Event: 'fork': 监听创建worker进程事件
// Event: 'online': 监听worker创建成功事件
// Event: 'listening': 监听worker向master状态事件
// Event: 'disconnect': 监听worker断线事件
// Event: 'exit': 监听worker退出事件
// Event: 'setup': 监听setupMaster事件
// cluster.setupMaster([settings]): 设置集群参数
// cluster.fork([env]): 创建worker进程
// cluster.disconnect([callback]): 关闭worket进程
// cluster.worker: 获得当前的worker对象
// cluster.workers: 获得集群中所有存活的worker对象
