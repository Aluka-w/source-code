/**
 * @description 实现 new
 * ① 首先创建一个空的对象，空对象的__proto__属性指向构造函数的原型对象
 * ② 空构造函数内部的this赋值为对象赋值，用构造函数内部的方法修改空对象
 * ③ 如果构造函数返回一个非基本类型的值，则返回这个值，否则上面创建的对象
 */

// 简单实现
function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype)
  const ret = fn.apply(obj, arg)
  return ret instanceof Object ? ret : obj
}
// 复杂实现
function newFactory(fn, ...args) {
  if (typeof fn !== 'function') {
    throw 'newOperator function the first param must be a function'
  }
  let obj = new Object()
  obj.__proto__ = Object.create(fn.prototype)
  let res = fn.apply(obj, ...args)

  let isObject = typeof res === 'object' && typeof res !== null
  let isFunction = typeof res === 'function'
  return isObject || isFunction ? res : obj
}
