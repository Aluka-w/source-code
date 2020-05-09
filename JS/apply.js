/**
 * @description 实现 apply 方法
 */
Function.prototype.apply = function (context, args) {
  let context = context || window
  context.fn = this
  // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。
  let result = eval('context.fn(...args)')

  delete context.fn
  return result
}
