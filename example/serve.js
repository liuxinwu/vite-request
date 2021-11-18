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
    }, parseInt(Math.random() * 5000 + 100))
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
    }, 5000)
    return
  }

  if (url === '/token') {
    res.end(JSON.stringify({
      data: {
        token: Date.now()
      },
      msg: 'token success'
    }))
    return
  }

  if (url.startsWith('/expire')) {
    const token = req.headers.token
    console.log(token, 'token')
    const expireTime = 3 * 1000

    console.log(Date.now() - token > expireTime, 'Date.now() - token > expireTime')
    if (Date.now() - token > expireTime) {
      setTimeout(() => {
        res.writeHead(401)
        res.end(JSON.stringify({
          data: {},
          msg: '登录态实现，请重新验证'
        }))
      }, parseInt(Math.random() * 500 + 100))
      return
    }

    setTimeout(() => {
      res.end(JSON.stringify({
        data: {
        },
        msg: 'expire success'
      }))
    }, parseInt(Math.random() * 500 + 100))
    return
  }

  setTimeout(() => {
    res.end(JSON.stringify({
      data: {
        value: 'respose success' + parseInt(Math.random() * 100)
      },
      msg: 'expire success'
    }))
  }, parseInt(Math.random() * 500 + 10))
}).listen(5000, err => {
  if (err) return console.log('listen port 5000 error', err)

  console.log('listen port 5000 success')
})