const queryString = require('querystring')
const handleBlogRoute = require('./src/routes/blog')

// 处理post数据
const getPostData = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}
const serverHandler = async (req, res) => {
  // 设置响应头
  res.setHeader('Content-Type', 'application/json')
  //   获取path
  const url = req.url
  req.path = url.split('?')[0]
  //   解析参数
  req.query = queryString.parse(url.split('?')[1])
  let postData = await getPostData(req, res)
  req.body = postData
  const blogData = handleBlogRoute(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }
  //   处理异常情况
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.write('404 not found')
  res.end()
}

module.exports = serverHandler
