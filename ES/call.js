/**
 * @description 实现 call 方法
 * 将函数设为对象的属性
 * 执行该函数
 * 删除该函数
 */
Function.prototype.call = function (context) {
  // context为null时Object(null)返回空对象，不会被赋值为window
  context = context ? Object(context) : window
  // 首先要获取调用call的函数，用this可以获取
  context.fn = this

  let args = [...arguments].slice(1)
  let result = context.fn(...args)

  delete context.fn
  return result
}
