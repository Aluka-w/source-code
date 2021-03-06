/**
 * @description 模拟实现一个 bind 的效果
 * ① 对于普通函数，绑定this指向
 * ② 对于构造函数，要保证原函数的原型对象上的属性不能丢失
 */

Function.prototype.bind = function (context, ...args) {
  // 异常处理
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    )
  }
  // 保存this的值，它代表调用 bind 的函数
  var self = this
  var fNOP = function () {}

  var fbound = function () {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    )
  }

  fNOP.prototype = this.prototype
  fbound.prototype = new fNOP()

  return fbound
}

/**
 * Object.create方式创建原型
 */
Function.prototype.bind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    )
  }

  var self = this

  var fbound = function () {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    )
  }

  fbound = Object.create(this.prototype)

  return fbound
}
