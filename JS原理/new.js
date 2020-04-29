/**
 * @description 实现 new
 * ① 让实例可以访问到私有属性
 * ② 让实例可以访问构造函数原型(constructor.prototype)所在原型链上的属性
 * ③ 如果构造函数返回的结果不是引用数据类型
 */


function newFactory(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw 'newOperator function the first param must be a function'
  }
  let obj = new Object()
  obj.__proto__ = Object.create(ctor.prototype)
  let res = ctor.apply(obj, ...args)

  let isObject = typeof res === 'object' && typeof res !== null
  let isFunction = typeof res === 'function'
  return isObject || isFunction ? res : obj
}
