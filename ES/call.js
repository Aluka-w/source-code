/**
 * @description 实现 call 方法
 */
Function.prototype.call = function (context, ...args) {
  var context = context || window
  context.fn = this

  var result = eval('context.fn(...args)')

  delete context.fn
  return result
}
