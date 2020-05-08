// 创建空对象
// 保证空对象 this指向 构造函数原型
// 如果构造函数返回基本类型, 则返回我们创建的空对象, 否则返回自己

function _new(fn, arg) {
  const obj = Object.create(fn.prototype)
  const rst = fn.call(obj, ...arg)

  (typeof rst === 'object' || typeof rst === 'function') ? rst : obj
}