/**
 * @description 实现 call 方法
 */
Function.prototype.call = function (context) {
  context = context ? Object(context) : window
  context.fn = this

  let args = [...arguments].slice(1)
  let result = context.fn(...args)

  delete context.fn
  return result
}
