/**
 * @description 实现 apply 方法
 */
Function.prototype.apply = function (context, arr) {
  // context为null时Object(null)返回空对象，不会被赋值为window
  context = context ? Object(context) : window
  // 首先要获取调用call的函数，用this可以获取
  context.fn = this

  let result
  if (!arr) {
    result = context.fn()
  } else {
    result = context.fn(...arr)
  }

  delete context.fn
  return result
}
