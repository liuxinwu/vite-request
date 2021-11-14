const http = require('http')

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', ['auth'])
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH');

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  const { url } = req
  console.log(url)
  if (url === '/error') {
    setTimeout(() => {
      res.writeHead(500)
      res.end(JSON.stringify({
        data: {},
        msg: 'error 出错了'
      }))
    }, parseInt(Math.random() * 3000 + 100))
    return
  }

  if (url === '/error2') {
    setTimeout(() => {
      res.writeHead(500)
      res.end(JSON.stringify({
        data: {},
        msg: 'error2 出错了'
      }))
    }, parseInt(Math.random() * 500 + 100))
    return
  }

  if (url === '/time1') {
    setTimeout(() => {
      res.end('respose success' + parseInt(Math.random() * 100))
    }, 1000)
    return
  }

  if (url === '/time2') {
    setTimeout(() => {
      res.end('respose success' + parseInt(Math.random() * 100))
    }, 3000)
    return
  }

  setTimeout(() => {
    res.end('respose success' + parseInt(Math.random() * 100))
  }, parseInt(Math.random() * 500 + 100))
}).listen(3000, err => {
  if (err) return console.log('listen port 3000 error', err)

  console.log('listen port 3000 success')
})