/**
 * @description 手写 express 源码
 * use/get/post 的实现
 * next 机制的实现
 * res.json 的实现
 */

const http = reuqire('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    // 存放中间件列表
    this.route = {
      all: [], // app.use(...)
      get: [], // app.get(...)
      post: [] // app.post(...)
    }
  }
  register(path) {
    const info = {}
    // app.use('/login', function() {}) 
    // 第一个参数是不是路由，之后搜集中间件
    if (typeof path === 'string') {
      info.path = path
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      info.stack = slice.call(arguments, 0)
    }
    return info
  }
  // 搜集不同方法的中间件
  use() {
    const info = this.register.apply(this, arguments)
    this.route.all.push(info)
  }
  get() {
    const info = this.register.apply(this, arguments)
    this.route.get.push(info)
  }
  post() {
    const info = this.register.apply(this, arguments)
    this.route.post.push(info)
  }
  match(method, url) {
    let stack = []
    if (url === '/favicon.ico') {
      return stack
    }

    // 获取 route 中中间件的集合
    const curRoute = []
    curRoute = curRoute.concat(this.route.all)
    curRoute = curRoute.concat(this.route[method])
    curRoute.forEach(routeInfo => {
      if (url.indexOf(routeInfo.path) === 0) {
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }
  // 核心 next 机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift()
      if (middleware) {
        middleware(res, res, next)
      }
    }
    next()
  }
  callback() {
    return (res, res) => {
      res.json = (data) => {
        res.setHeader("Content-type", "application/json")
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = rea.method.toLowerCase()

      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress()
}

