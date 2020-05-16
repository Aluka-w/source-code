/**
 * koa中间件机制
 * 洋葱圈模型
 * 遇到next, 就进入下一层, 直至到ctx.body, 再一层层返回(递归)
 * 打印顺序是: 一开始 -> 二开始 -> 三开始 -> 三结束 -> 二结束 -> 一结束
 */

const Koa = require("./likeKoa")
const app = new Koa()

// logger
app.use(async (ctx, next) => {
  console.log('第一层, 开始')
  await next()
  const rt = ctx["X-Response-Time"]
  console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`)
  console.log('第一层, 结束')
})

// x-response-time

app.use(async (ctx, next) => {
  console.log('第二层, 开始')
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx["X-Response-Time"] = `${ms}ms`
  console.log('第二层, 结束')
})

// response

app.use(async (ctx) => {
  console.log('第三层, 开始')
  ctx.res.end = "Hello World"
  console.log('第三层, 结束')
})

app.listen(3000)

