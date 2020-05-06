// apply/call
// Function.prototype.call = function(context, ...args) {
//   var context = context || window
//   context.fn = this
//   let result = eval('context.fn(...args)')

//   delete context.fn
//   return result
// }

// 模拟实现一个 bind 的效果
// Object.create
Function.prototype.bind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error(
      '不是function'
    )
  }
  var _that = this

  var fbound = function() {
    _that.apply(
      this instanceof _that ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    )
  }

  fbound = Object.create(this.prototype)

  return fbound
}