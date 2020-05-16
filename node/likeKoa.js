/**
 * 模拟koa
 */
const http = require('http')

// 组合中间件
function compose(middlewareList) {
  return function (ctx) {
    function dispatch(i) {
      const fn = middlewareList[i]
      try {
        // 兼容外部没有 async包裹时候的情况
        return Promise.resolve(
          fn(ctx, dispatch.bind(null, i + 1))
        )
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return dispatch(0)
  }
}

class LikeKoa2 {
  constructor() {
    this.middlewareList = []
  }
  use(fn) {
    this.middlewareList.push(fn)
    // 方便链式调用
    return this
  }
  createContext (req, res) {
    const ctx = {
      req, res
    }
    ctx.query = req.query
    return ctx
  }
  handleRequest(ctx, fn) {
    return fn(ctx)
  }
  callback() {
    const fn = compose(this.middlewareList)
    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = LikeKoa2